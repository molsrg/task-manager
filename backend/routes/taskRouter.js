const Router = require('express');
const router = new Router();
const controller = require('../controllers/taskController');
router.post('/create', controller.createTask);
router.get('/get', controller.getTasks);

module.exports = router;
