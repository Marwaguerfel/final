import mongoose from 'mongoose';

const componentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    taskTheme: { type: mongoose.Schema.Types.ObjectID, ref: "TaskTheme" },

    taskModel: { type: mongoose.Schema.Types.ObjectID, ref: "TaskModel" },
    deleted: {
      type: mongoose.Schema.Types.Boolean,
      index: true,
      default: false,
    },
  },

);
const Components = mongoose.model('Components', componentsSchema);
export default Components;