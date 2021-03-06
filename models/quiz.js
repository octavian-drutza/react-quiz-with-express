const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  data: [
    {
      id: {
        type: String,
      },
      type: {
        type: String,
      },
      question: {
        type: String,
      },
      answers: [
        {
          name: {
            type: String,
          },
          correct: {
            type: Boolean,
          },
        },
      ],
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
