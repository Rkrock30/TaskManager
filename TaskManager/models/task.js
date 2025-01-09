const { required } = require("joi");
const mongoose = require("mongoose");

let taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, reuired: true },
  status: {
    type: String,
    reuired: true,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  assignee: {  type: mongoose.Schema.Types.ObjectId, ref: 'User', reuired: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isDeleted: { type: String, required: true, default: "N" },
});

taskSchema.index({ assignee: 1 });
taskSchema.index({ createdBy: 1 });

const Task = mongoose.model("Task", taskSchema);
module.exports = { Task };
