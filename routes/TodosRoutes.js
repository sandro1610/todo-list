import express from 'express';
import * as Todos from "../controllers/TodosController.js";

const  router = express.Router();

router.get('/todo-items', Todos.getTodos);
router.get('/todo-items/:id', Todos.getTodoById);
router.post('/todo-items', Todos.createTodo);
router.patch('/todo-items/:id', Todos.updateTodo);
router.delete('/todo-items/:id', Todos.deleteTodo);

export default router;