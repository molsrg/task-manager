const { Schema, model } = require('mongoose');
const refreshToken = new Schema({
  userId: { type: String, unique: true, required: true },
  token: { type: String, unique: true, required: true },
  createdAt: { type: Date, unique: true, required: true },
  expiresAt: { type: Date, unique: true, required: true },
});
module.exports = model('refreshToken', refreshToken);
