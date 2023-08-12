const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();

const authRouter = require('./authRouter');

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://timealive:Rerere23@cluster.nwuaiol.mongodb.net/auth_roles?retryWrites=true&w=majority'
    );
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
