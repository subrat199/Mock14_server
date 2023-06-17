const express=require('express');
const { quizModel } = require('../model/quizModel');
const quizRouter=express.Router()

quizRouter.post('/', async (req, res) => {
    try {
      const quiz = new quizModel(req.body);
      await quiz.save();
      res.status(201).json({ success: true, quiz });
    } catch (error) {
      console.error('Failed to create quiz', error);
      res.status(500).json({ success: false, error: 'Failed to create quiz' });
    }
  });
  module.exports = {quizRouter};