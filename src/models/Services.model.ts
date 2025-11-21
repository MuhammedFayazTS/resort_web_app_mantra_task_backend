import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String },
});

export default mongoose.model('Service', serviceSchema);
