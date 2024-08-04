import mongoose from 'mongoose';

const driveSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
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
  file: {
    data: {
      type: Buffer, // Storing binary data
    },
    contentType: {
      type: String,
      required: true,
      enum: ['image/jpeg', 'image/png', 'application/pdf'], // Allowed MIME types
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Drive = mongoose.model('Drive', driveSchema);

export default Drive;
