import mongoose from "mongoose";


const taskThemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
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
const TaskTheme = mongoose.model('TaskTheme', taskThemeSchema);
export default TaskTheme;