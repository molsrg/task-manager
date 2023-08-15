const { Schema, model } = require('mongoose');
const refreshToken = new Schema({
  userId: { type: String, unique: true, require: true },
  token: { type: String, unique: true, require: true },
  createdAt: { type: Date, unique: true, require: true },
  expiresAt: { type: Date, unique: true, require: true },
});
module.exports = model('refreshToken', refreshToken);
