import express from 'express';
import * as Todos from "../controllers/TodosController.js";

const  router = express.Router();

router.get('/todo-items', Todos.getTodos);
router.get('/todo-items/:todo_id', Todos.getTodoById);
router.post('/todo-items', Todos.createTodo);
router.patch('/todo-items/:todo_id', Todos.updateTodo);
router.delete('/todo-items/:todo_id', Todos.deleteTodo);

export default router;