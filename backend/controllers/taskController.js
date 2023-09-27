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
    throw new Error(error);
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
  async getTasks(req, res) {
    try {
      const { startTime, endTime } = req.query;
      const id = getIdFromHeader(req);
      const tasks = await Task.find({
        startTime: { $gte: new Date(startTime) },
        endTime: { $lte: new Date(endTime) },
        owner: id,
      });
      return res.status(200).json({ tasks });
    } catch (error) {
      res.status(401).json({ message: 'Ошибка при поиске задач', error });
    }
  }
}
module.exports = new TaskController();
//метод для создания задачи (done)
//чтение задач в промежутке времени (done)
// метод для редактирования задачи
// метод для удаления задачи (?)
//уведомление о скором сроке завершения задачи
