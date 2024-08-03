import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import XLSX from 'xlsx';
import Student_mark from '../models/Student_mark.js'; // Import the student model
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';



const excelFileUrl = 'https://docs.google.com/spreadsheets/d/10ugHGs6W7JvqzerWl3hQNuIqAnzKvffD/export?format=xlsx';

// Function to download and read the Excel file
const fetchExcelData = async (usn) => {
  try {
    const response = await axios.get(excelFileUrl, { responseType: 'arraybuffer' });

    const workbook = XLSX.read(response.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const studentData = data.find(row => row['USN'] === usn);

    if (!studentData) {
      return null;
    }

    const result = [];
    const subjectCodePrefixes = ['Subject code', 'Subject code_', 'Sub Code', 'Sub code'];

    const maxSubjects = Math.max(...Object.keys(studentData)
      .filter(key => key.startsWith('Subject code') || key.startsWith('Sub Code'))
      .map(key => parseInt(key.replace(/\D/g, ''), 10) || 0)
    );

    for (let i = 0; i <= maxSubjects; i++) {
      for (let prefix of subjectCodePrefixes) {
        const subjectCodeKey = i === 0 ? prefix : `${prefix}${i}`;
        const totalKey = i === 0 ? 'Total' : `Total_${i}`;

        if (studentData[subjectCodeKey]) {
          const subjectCode = studentData[subjectCodeKey];
          const total = studentData[totalKey];

          if (total !== undefined) {
            result.push({ subjectCode, marks: total });
          }
        }
      }
    }

    return result;
  } catch (error) {
    console.error('Error fetching Excel data:', error);
    throw error;
  }
};

router.post('/api/user/marks_verification', async (req, res) => {
  const gdriveLink = req.body.gdriveLink;
  const fileId = gdriveLink.match(/[-\w]{25,}/);

  if (!fileId) {
    return res.status(400).json({ error: "Invalid Google Drive link" });
  }

  const pdfUrl = `https://drive.google.com/uc?export=download&id=${fileId[0]}`;
  // const filePath = path.join(__dirname, 'temp.pdf');
  const __dirname = dirname(fileURLToPath(import.meta.url));


  // const __dirname = new URL('.', import.meta.url).pathname.slice(1); 
  const filePath = path.join(__dirname, 'temp.pdf');
  // const viewsPath = path.join(__dirname, '../views');

  try {
    const response = await axios({
      method: 'GET',
      url: pdfUrl,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        const text = data.text;

        const nameMatch = text.match(/Student Name\s*:\s*(.*)/);
        const usnMatch = text.match(/University Seat Number\s*:\s*(.*)/);
        const semesterMatch = text.match(/Semester\s*:\s*(\d+)/);

        const studentName = nameMatch ? nameMatch[1].trim() : 'N/A';
        const usn = usnMatch ? usnMatch[1].trim() : 'N/A';
        const semester = semesterMatch ? semesterMatch[1].trim() : 'N/A';

        const startIndex = text.indexOf(`Semester : ${semester}`);
        const endIndex = text.indexOf('Nomenclature / Abbreviations');

        if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
          fs.unlinkSync(filePath);
          return res.status(404).json({ error: "Markers not found or invalid range" });
        }

        const relevantText = text.substring(startIndex, endIndex).trim();
        const tableRows = relevantText.split('\n').filter(line => line.trim() !== '');

        const tableContent = [];
        let currentRow = '';

        const processCurrentRow = (row) => {
          if (row) {
            const subjectCode = row.match(/^\d{2}[A-Z]{2,5}\d{2,3}/);
            const totalMarks = row.match(/(?<=\d)\d{2}(?=P)/);

            tableContent.push({
              subjectCode: subjectCode ? subjectCode[0] : 'N/A',
              totalMarks: totalMarks ? totalMarks[0] : 'N/A'
            });
          }
        };

        for (let i = 2; i < tableRows.length; i++) {
          const line = tableRows[i];
          const subjectCodeMatch = line.match(/^\d{2}[A-Z]{2,5}\d{2,3}/);
          if (subjectCodeMatch) {
            if (currentRow) {
              processCurrentRow(currentRow);
            }
            currentRow = line;
          } else {
            currentRow += ' ' + line;
          }
        }

        processCurrentRow(currentRow);

        const filteredTableContent = tableContent.filter(row => row.subjectCode !== 'N/A' && row.totalMarks !== 'N/A');

        const excelData = await fetchExcelData(usn);

        if (!excelData) {
          fs.unlinkSync(filePath);
          return res.status(404).json({ error: "USN not found in Excel" });
        }

        const mismatches = filteredTableContent.map(pdfRow => {
          const excelRow = excelData.find(row => row.subjectCode === pdfRow.subjectCode);
          if (excelRow) {
            return {
              subjectCode: pdfRow.subjectCode,
              pdfMarks: pdfRow.totalMarks,
              excelMarks: excelRow.marks,
              status: Number(excelRow.marks) === Number(pdfRow.totalMarks) ? 'Matched' : 'Not Matched'
            };
          }
          return {
            subjectCode: pdfRow.subjectCode,
            pdfMarks: pdfRow.totalMarks,
            excelMarks: 'N/A',
            status: 'Not Matched'
          };
        });

        const allVerified = mismatches.every(m => m.status === 'Matched');

        // Determine the status based on whether all subjects are verified
        const verificationStatus = allVerified ? 'Verified' : 'Not Verified';

        // Use `updateOne` with `upsert` to either update existing record or insert a new one
        const result = await Student_mark.updateOne(
          { usn: usn },  // Filter to find the document by USN
          {
            $set: {
              name: studentName,
              status: verificationStatus,
            }
          },
          { upsert: true }  // Create a new document if one does not exist
        );

        if (result.upsertedCount > 0) {
          console.log(`Inserted new document for USN: ${usn}`);
        } else if (result.modifiedCount > 0) {
          console.log(`Updated existing document for USN: ${usn}`);
        } else {
          console.log(`No changes made for USN: ${usn}`);
        }

        fs.unlinkSync(filePath);
        res.json({ studentName, usn, semester, mismatches, status: verificationStatus });
      } catch (err) {
        fs.unlinkSync(filePath);
        console.error("Error extracting text from PDF:", err);
        res.status(500).json({ error: "Error extracting text from PDF" });
      }
    });

    writer.on('error', (err) => {
      fs.unlinkSync(filePath);
      res.status(500).json({ error: "Error downloading the PDF" });
    });
  } catch (error) {
    console.error("Error fetching or parsing PDF:", error);
    res.status(500).json({ error: "Error fetching or parsing PDF. Please check the console for more details." });
  }
});

// router.get('/students', async (req, res) => {
//   try {
//     const students = await Student.find({});
//     res.json(students);
//   } catch (err) {
//     console.error('Error fetching students:', err);
//     res.status(500).json({ error: 'Error fetching students' });
//   }
// });

export default router;
