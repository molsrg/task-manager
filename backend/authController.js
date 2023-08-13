const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};
class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        res.status(400).json({ errors: errorMessages });
        console.log(req.body);
        return;
      }

      const { username, email, password } = req.body;
      const candidateUsername = await User.findOne({ username });
      const candidateEmail = await User.findOne({ email });
      if (candidateUsername) {
        res
          .status(400)
          .json({ message: 'Пользователь с таким именем уже существует' });
        return;
      }
      if (candidateEmail) {
        res
          .status(400)
          .json({ message: 'Почтовый адрес уже был зарегистрирован' });
        return;
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
      return;
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
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
