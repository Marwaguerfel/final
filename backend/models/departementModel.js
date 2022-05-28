import mongoose from 'mongoose';

const departementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    deleted: {
      type: mongoose.Schema.Types.Boolean,
      index: true,
      default: false,
    }, 
  },

);
const Deparetement = mongoose.model('Deparetement', departementSchema);
export default Deparetement;