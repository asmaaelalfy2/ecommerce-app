const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter=require('./routes/user')
require('dotenv').config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('database connected');
  });

  app.use(express.json())

app.use('/api/user',userRouter)

app.get('/', function (req, res) {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('server running ');
});
