const quizes = [
  {
    quizId: '1',
    title: 'This is the first quiz',
    data: [
      {
        id: '1sdfsw',
        type: 'multiple',
        question: 'What is considered the rarist form of color blindness?',
        answers: [
          { name: 'Blue', correct: true },
          { name: 'Red', correct: false },
          { name: 'Green', correct: true },
          { name: 'Purple', correct: false },
        ],
      },
      {
        id: 'ssa32',
        type: 'single',
        question:
          'What is the defining characteristic of someone who is described as hirsute?',
        answers: [
          { name: 'Tall', correct: false },
          { name: 'Funny', correct: false },
          { name: 'Rude', correct: false },
          { name: 'Hairy', correct: true },
        ],
      },
    ],
  },
  {
    quizId: '2',
    title: 'This is the second quiz',
    data: [
      {
        id: 'gsre44',
        type: 'input',
        question: 'What is the capital of Romania?',
        answers: [{ name: 'B', correct: true }],
      },
      {
        id: '5llkkj9',
        type: 'input',
        question: 'What is the capital of Poland?',
        answers: [{ name: 'W', correct: true }],
      },
      {
        id: 'sd6l3',
        type: 'single',
        question: 'What is the capital of Estonia?',
        answers: [
          { name: 'Riga', correct: false },
          { name: 'Tart', correct: false },
          { name: 'Talinn', correct: true },
          { name: 'Helsinki', correct: false },
        ],
      },
    ],
  },
];

export default quizes;
