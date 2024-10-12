import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  description: { type: String, required: true },
  location: { type: String },
  witnesses: [String],
  employees: [String],
  documents: [{ type: String }], // Store file paths or URLs
  videos: [{ type: String }], // Store file paths or URLs
  chainOfCustody: [{
    action: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Case = mongoose.model('Case', caseSchema);

export default Case;