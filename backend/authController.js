const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors });
      }

      const { username, email, password } = req.body;
      const candidateUsername = await User.findOne({ username });
      const candidateEmail = await User.findOne({ email });
      if (candidateUsername) {
        res
          .status(400)
          .json({ message: 'Пользователь с таким именем уже существует' });
      }
      if (candidateEmail) {
        res
          .status(400)
          .json({ message: 'Почтовый адрес уже был зарегистрирован' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        username,
        email,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.status(200).json('Пользователь создан');
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration failed' });
    }
  }
  async login(req, res) {
    try {
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login failed' });
    }
  }
  async getUsers(req, res) {
    try {
      res.json('Getting users');
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new authController();
