import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    description: { type: String, required: true },
    week:{ type: mongoose.Schema.Types.ObjectID, ref: "Week" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    taskModel: { type: mongoose.Schema.Types.ObjectID, ref: "TaskModel" },
    component:{ type: mongoose.Schema.Types.ObjectID, ref: "Components" },
    taskState: { type: mongoose.Schema.Types.ObjectID, ref: "TaskState" },
      
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", TaskSchema);
export default Task;
