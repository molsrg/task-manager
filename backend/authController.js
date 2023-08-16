const User = require('./models/User');
const Role = require('./models/Role');
const refreshToken = require('./models/refreshToken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { AccessSecret, RefreshSecret } = require('./config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, AccessSecret, { expiresIn: '24h' });
};

const generateRefreshToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, RefreshSecret, { expiresIn: '7d' });
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
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: `Почта ${email} не найдена` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(400).json({ message: `Введен неверный пароль` });
      }
      const AccessToken = generateAccessToken(user._id, user.roles);
      const RefreshToken = generateRefreshToken(user._id);
      const refToken = new refreshToken({
        userId: user._id,
        token: bcrypt.hashSync(RefreshToken, 7),
        createdAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await refToken.save();

      return res.json({ AccessToken, RefreshToken });
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
