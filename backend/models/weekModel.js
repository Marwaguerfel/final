import mongoose from 'mongoose';

const weekSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true},
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    deleted: {
      type: mongoose.Schema.Types.Boolean,
      index: true,
      default: false,
    },
  },

);
const Week = mongoose.model('Week', weekSchema);
export default Week;