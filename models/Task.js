const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  taskName: { type: String, required: true, unique: true },
  startDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
  duration: { type: Number, required: true },
  progress: { type: Number, required: true },
  priority: { type: String, required: true },
  approved: { type: Boolean, required: true },
  subtasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  mainTask: { type: Schema.Types.ObjectId, ref: "Task", required: false },
});

module.exports = model("Task", TaskSchema);
