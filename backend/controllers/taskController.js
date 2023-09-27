const jwt = require('jsonwebtoken');
const { AccessSecret } = require('../config');
const Task = require('../models/Task');
const getIdFromHeader = (req) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new Error('Нет токена доступа в запросе');
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new Error('Неверный формат токена');
    }
    const id = jwt.verify(parts[1], AccessSecret).id;
    return id;
  } catch (error) {
    throw error;
  }
};

class TaskController {
  async createTask(req, res) {
    try {
      const { name, type, text, status, startTime, endTime } = req.body;
      const id = getIdFromHeader(req);
      const task = new Task({
        name: name,
        type: type,
        text: text,
        status: status,
        startTime: startTime,
        endTime: endTime,
        owner: id,
      });
      await task.save();
      res.status(201).json({ message: 'Задача успешно создана', task });
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при создании задачи', error });
    }
  }
}
module.exports = new TaskController();
//метод для создания задачи (done)
//чтение задачи
// метод для редактирования задачи
// метод для удаления задачи (?)
//уведомление о скором сроке завершения задачи
