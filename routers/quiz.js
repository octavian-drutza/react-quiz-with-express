const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Quiz = require('../models/quiz');

router.post('/api/quizes', auth, async (req, res) => {
  const quiz = new Quiz({ ...req.body, creator: req.user._id });

  try {
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/api/quizes', async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.send(quizes);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/api/quizes/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const quiz = await Quiz.findOne({ _id });

    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    return res.status(500).send();
  }
});

router.delete('/api/quizes/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const quiz = await Quiz.findOneAndDelete({ _id, creator: req.user._id });
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/api/quizes/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body).filter((key) => key !== '_id');
  try {
    const quiz = await Quiz.findOne({ _id, creator: req.user._id });
    if (!quiz) {
      return res.status(404).send();
    }
    updates.forEach((update) => (quiz[update] = req.body[update]));
    await quiz.save();
    res.send(quiz);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
