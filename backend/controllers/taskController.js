import Task from '../models/Task';
class TaskController {
  async createTask(req, res) {
    try {
      const { _name, _type, _text, _status, _startTime, _endTime } = req.body;

      const task = new Task({
        name: _name,
        type: _type,
        text: _text,
        status: _status,
        startTime: _startTime,
        endTime: _endTime,
      });
      await task.save();
      res.status(201).json({ message: 'Задача успешно создана', task });
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при создании задачи' });
    }
  }
}
module.exports = new TaskController();
//метод для создания задачи (done)
//чтение задачи
// метод для редактирования задачи
// метод для удаления задачи (?)
//уведомление о скором сроке завершения задачи
