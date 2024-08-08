import mongoose from 'mongoose';

const driveSchema = new mongoose.Schema({
  topic: {
    type: String,
    default:"Drive",
  },
  batch: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  criteria: {
    type: String,
    required: true,
  },
  files: [
    {
      data: Buffer, // Storing binary data
      contentType: {
        type: String,
        enum: ['image/jpeg', 'image/png', 'application/pdf'], // Allowed MIME types
      },
      fileName: String,
    }
  ],
  registrationLink:{
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Drive = mongoose.model('Drive', driveSchema);

export default Drive;
