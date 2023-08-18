const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть длиннее 8 символов').isLength({
      min: 8,
    }),
    check('password', 'Пароль должен содержать заглавную букву').matches(
      /[A-Z]/
    ),
    check('password', 'Пароль должен содержать одну цифру').matches(/[0-9]/),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.get('/users', controller.getUsers);

module.exports = router;
