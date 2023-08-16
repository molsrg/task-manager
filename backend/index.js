const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();

const authRouter = require('./authRouter');
const { startSchedule } = require('./scheduler');

app.use(function (req, res, next) {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Локальный домен, который может получать данные
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://timealive:Rerere23@cluster.nwuaiol.mongodb.net/auth_roles?retryWrites=true&w=majority'
    );
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    startSchedule();
  } catch (e) {
    console.log(e);
  }
};
start();
