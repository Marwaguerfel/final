import mongoose from "mongoose";



const taskModelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    taskTheme: { type: mongoose.Schema.Types.ObjectID, ref: "TaskTheme" },
     // deleted flag for soft delete feature
    deleted: {
      type: mongoose.Schema.Types.Boolean,
      index: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const TaskModel = mongoose.model('TaskModel', taskModelSchema);
export default TaskModel;