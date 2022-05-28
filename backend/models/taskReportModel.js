import mongoose from 'mongoose';

const taskReportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    components: { type: mongoose.Schema.Types.ObjectID, ref: "Components" },
    deleted: {
      type: mongoose.Schema.Types.Boolean,
      index: true,
      default: false,
    },
  },

);
const taskReport = mongoose.model('taskReport', taskReportSchema);
export default taskReport;