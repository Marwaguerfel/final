import mongoose from 'mongoose';

const componentStateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    deleted: {
      type: mongoose.Schema.Types.Boolean,
      index: true,
      default: false,
    },
}

);
const ComponentState = mongoose.model('ComponentState', componentStateSchema);
export default ComponentState;