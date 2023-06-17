const express=require('express');
const { quizModel } = require('../model/quizModel');
const quizRouter=express.Router()

quizRouter.post('/', async (req, res) => {
    try {
      const quiz = new quizModel(req.body);
      await quiz.save();
      res.status(201).json({  quiz });
    } catch (error) {
      console.error('Failed to create quiz', error);
      res.status(500).json({ success: false, error: 'Failed to create quiz' });
    }
  });
  quizRouter.get('/quizdata', async (req, res) => {
    try {
      const quizzes = await quizModel.find()
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve quizzes' });
    }
  });
  quizRouter.get('/quizdata/:id', async (req, res) => {
    try {
      const quiz = await quizModel.findById(req.params.id);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve quiz' });
    }
  });
  quizRouter.put('/quizdata/:id', async (req, res) => {
    try {
      const { title, description } = req.body;
  
      const quiz = await quizModel.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true }
      );
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update quiz' });
    }
  });
  quizRouter.delete('/quizdata/:id', async (req, res) => {
    try {
      const quiz = await quizModel.findByIdAndDelete(req.params.id);
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete quiz' });
    }
  });
  
  module.exports = {quizRouter};