const express = require('express');
require('./db/mongoose');
const cors = require('cors');

const quizRouter = require('./routers/quiz');
const userRouter = require('./routers/user');

const app = express();
app.use(express.json());
app.use(cors());

app.use(quizRouter);
app.use(userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
