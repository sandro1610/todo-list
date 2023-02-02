var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  createTodo: () => createTodo,
  deleteTodo: () => deleteTodo,
  getTodoById: () => getTodoById,
  getTodos: () => getTodos,
  updateTodo: () => updateTodo
});
var import_Todos = __toModule(require("../models/Todos.js"));
const getTodos = async (req, res) => {
  try {
    const activity_group_id = req.query.activity_group_id;
    let todos;
    if (activity_group_id == null || activity_group_id == void 0) {
      todos = await import_Todos.default.findAll();
    } else {
      todos = await import_Todos.default.findAll({ where: { activity_group_id } });
    }
    res.status(200).json({
      "status": "Success",
      "message": "Success",
      "data": todos
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await import_Todos.default.findOne({ where: { id } });
    if (todo == null) {
      return res.status(404).json({
        "status": "Not Found",
        "message": `Todo with ID ${id} Not Found`
      });
    }
    res.status(200).json({
      "status": "Success",
      "message": "Success",
      "data": todo
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const createTodo = async (req, res) => {
  try {
    const title = req.body.title;
    const activity_group_id = req.body.activity_group_id;
    const priority = req.body.priority;
    if (title == null) {
      return res.status(400).json({
        "status": "Bad Request",
        "message": "title cannot be null"
      });
    } else if (activity_group_id == null) {
      return res.status(400).json({
        "status": "Bad Request",
        "message": "activity_group_id cannot be null"
      });
    }
    const todoCreate = await import_Todos.default.create({
      title,
      activity_group_id,
      priority
    });
    res.status(201).json({
      "status": "Success",
      "message": "Success",
      "data": todoCreate
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateTodo = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const todo = await import_Todos.default.findOne({ where: { id } });
  if (todo == null) {
    return res.status(404).json({
      "status": "Not Found",
      "message": `Todo with ID ${id} Not Found`
    });
  } else if (title == null || title == void 0) {
    return res.status(400).json({
      "status": "Bad Request",
      "message": "Title cannot be null"
    });
  }
  await import_Todos.default.update({
    title
  }, {
    where: { id }
  });
  const todoUpdate = await import_Todos.default.findOne({ where: { id } });
  res.status(200).json({
    "status": "Success",
    "message": "Success",
    "data": todoUpdate
  });
};
const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const todo = await import_Todos.default.findOne({ where: { id } });
  if (todo == null) {
    return res.status(404).json({
      "status": "Not Found",
      "message": `Todo with ID ${id} Not Found`
    });
  }
  await import_Todos.default.destroy({ where: { id } });
  res.status(200).json({
    "status": "Success",
    "message": "Success"
  });
};