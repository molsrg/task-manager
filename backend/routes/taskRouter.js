const Router = require('express');
const router = new Router();
const controller = require('../controllers/taskController');
router.post('/create', controller.createTask);

module.exports = router;
