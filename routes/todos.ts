/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import JSONStream from 'JSONStream';
import Todo from '../models/todo';
import ResponseCodes from '../enums/enum-http-codes';
import skipTodos from '../additional/todos-limit';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = Number(req.query.limit ?? 0);
    const page = skipTodos(limit, Number(req.query.page ?? 0));
    const todosStream = await Todo
      .find()
      .limit(limit)
      .skip(page)
      .cursor();
    todosStream
      .pipe(JSONStream.stringify())
      .pipe(res.status(ResponseCodes.OK));
  } catch (err: unknown) {
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const todo = new Todo({
    message: req.body.message,
    completed: req.body.completed,
  });

  try {
    const savedTodo = await todo.save();
    res
      .status(ResponseCodes.CREATED)
      .json(savedTodo);
  } catch (err: unknown) {
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res
      .status(ResponseCodes.OK)
      .json(todo);
  } catch (err: unknown) {
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removedTodo = await Todo.deleteOne({ _id: req.params.id });
    res
      .status(ResponseCodes.NO_CONTENT)
      .json(removedTodo);
  } catch (err: unknown) {
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: req.body },
    );
    res
      .status(ResponseCodes.CREATED)
      .json(updatedTodo);
  } catch (err: unknown) {
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err });
  }
});

export default router;
