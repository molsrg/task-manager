const { Schema, model } = require('mongoose');

const validTypes = ['Personal', 'Working', 'Optional'];
const validStatus = ['Done', 'In Progress'];
const Task = new Schema({
  name: { type: String, unique: true, require: true },
  type: { type: String, enum: validTypes, require: true }, //enum
  text: { type: string },
  status: { type: String, enum: validStatus, require: true },
  startTime: { type: Date, require: true },
  endTime: { type: Date, require: true },
});
module.exports = model('Task', Task);
