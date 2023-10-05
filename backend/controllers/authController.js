const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../models/User');
const Role = require('../models/Role');
const refreshToken = require('../models/refreshToken');
const {
  AccessSecret,
  RefreshSecret,
  ClientID,
  ClientSecret,
} = require('../config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, AccessSecret, { expiresIn: '7d' });
};

const generateRefreshToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, RefreshSecret, { expiresIn: '7d' });
};

class authController {
  async registration(req, res) {
    try {
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
        createdAt: Date.now(),
      });

      await user.save();
      const AccessToken = generateAccessToken(user._id, user.roles);
      const RefreshToken = generateRefreshToken(user._id);

      const refToken = new refreshToken({
        userId: user._id,
        token: RefreshToken,
        createdAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      await refToken.save();
      return res.json({
        message: 'Пользователь создан',
        AccessToken,
        RefreshToken,
      });
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
        token: RefreshToken,
        createdAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      refreshToken.deleteMany({
        userId: user._id,
      });
      await refToken.save();
      return res.json({ AccessToken, RefreshToken });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login failed', e });
    }
  }

  async refresh(req, res) {
    try {
      const { accessToken } = req.body;
      const _id = jwt.verify(accessToken, RefreshSecret).id;
      const user = await User.findById(_id);
      console.log(user);
      if (user) {
        const refreshTokenExistanse = await refreshToken.findOne({
          userId: _id,
        });
        console.log(refreshTokenExistanse);
        if (refreshTokenExistanse) {
          const accessToken = generateAccessToken(_id, 'User');
          res.status(200).json({ message: 'Лови!', accessToken });
        } else {
          res.status(200).json({ message: 'RefreshToken не найден' });
        }
      } else {
        res.status(200).json({
          message: 'Чет пользователя такого нет, Access Token invalid',
        });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
  async gh_oauth(req, res) {
    const code = req.body.code;
    const tokenURL = 'https://github.com/login/oauth/access_token';
    const tokenData = {
      client_id: ClientID,
      client_secret: ClientSecret,
      code: code,
    };
    try {
      const response = await axios.post(tokenURL, tokenData, {
        headers: {
          Accept: 'application/json',
        },
      });
      console.log(req.body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new authController();
