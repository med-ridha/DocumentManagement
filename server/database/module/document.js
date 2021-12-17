import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    doc: { type: String, required: true }
}, { versionKey: false });

const document = mongoose.model('document', documentSchema);

export default document;
