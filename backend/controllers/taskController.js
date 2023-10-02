const jwt = require('jsonwebtoken');
const { AccessSecret } = require('../config');
const Task = require('../models/Task');
const TaskList = require('../models/taskList');
const authValidation = (req) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new Error('Нет токена доступа в запросе');
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new Error('Неверный формат токена');
    }
    return parts[1];
  } catch (error) {
    throw new Error('Ошибка при валидации токена', error);
  }
};
getIdFromToken = (token) => {
  try {
    id = jwt.verify(token, AccessSecret).id;
    return id;
  } catch (error) {
    console.log(error);
    throw new Error('Ошибка при получении id');
  }
};

class TaskController {
  async createTask(req, res) {
    try {
      const { name, type, text, status, startTime, endTime } = req.body;
      const token = authValidation(req);
      const id = getIdFromToken(token);
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
      const token = authValidation(req);
      const id = getIdFromToken(token);
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
  async editTask(req, res) {
    try {
      const { name, type, text, status, startTime, endTime, id } = req.body;
      const token = authValidation(req); //id в теории не нужен, но в этот метод вшита валидация пользователя. Да, некрасиво. Буду ли я исправлять? Не думаю
      Task.findByIdAndUpdate(id, {
        name: name,
        type: type,
        text: text,
        status: status,
        startTime: startTime,
        endTime: endTime,
        owner: id,
      });
    } catch (error) {
      res.status(200).json({ message: 'Непредвиденная ошибка', error });
    }
  }
  async createTaskList(req, res) {
    try {
      const { title, toggleCircle, isTasklistVisible, startTime, endTime } =
        req.body;
      const token = authValidation(req);
      const id = getIdFromToken(token);
      const tasks = await Task.find({
        startTime: { $gte: new Date(startTime) },
        endTime: { $lte: new Date(endTime) },
        owner: id,
      });
      const taskList = new TaskList({
        title: title,
        toggleCircle: toggleCircle,
        isTasklistVisible: isTasklistVisible,
        tasks: tasks,
        startTime: startTime,
        endTime: endTime,
        owner: id,
      });
      await taskList.save();
      res.status(200).json({ message: 'Задача успешно создана' });
    } catch (error) {
      console.log(error);
      throw new Error('Ошибка при создании списка');
    }
  }
  async getTaskList(req, res) {
    try {
      const token = authValidation(req);
      const id = getIdFromToken(token);
      const { title } = req.query;
      console.log(title);
      const tasksList = await TaskList.find({
        title: title,
        owner: id,
      });
      res.status(200).json({ tasksList });
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при получении задачи', error });
    }
  }
}
module.exports = new TaskController();
//метод для создания задачи (done)
//чтение задач в промежутке времени (done)
// метод для редактирования задачи (done)
//методы для создания/получения и хранения именованных списков задач (done)
// метод для создания списка задач
// метод для удаления задачи (?)
//уведомление о скором сроке завершения задачи
