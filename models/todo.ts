import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodoSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  id: ObjectId,
});

const todoModel = mongoose.model('Todo', TodoSchema);

export default todoModel;
