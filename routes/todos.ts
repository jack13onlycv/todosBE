/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import Todo from '../models/todo';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = +(req.query.limit ?? 0);
    const page = (limit * +(req.query.page ?? 0)) - limit;
    const todos = await Todo.find().limit(limit).skip(Math.max(0, page));
    res.status(200);
    res.json(todos);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const todo = new Todo({
    message: req.body.message,
    completed: req.body.completed,
  });

  try {
    const savedTodo = await todo.save();
    res.status(201);
    res.json(savedTodo);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200);
    res.json(todo);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removedTodo = await Todo.deleteOne({ _id: req.params.id });
    res.status(204);
    res.json(removedTodo);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { message: req.body.message, completed: req.body.completed } },
    );
    res.status(200);
    res.json(updatedTodo);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

export default router;
