import mongoose from 'mongoose';

const SystemSchema = new mongoose.Schema(
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
const System = mongoose.model('System', SystemSchema);
export default System;