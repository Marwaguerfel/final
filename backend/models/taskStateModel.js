import mongoose from 'mongoose';

const taskStateSchema = new mongoose.Schema(
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

const TaskState = mongoose.model('TaskState', taskStateSchema);
export default TaskState;