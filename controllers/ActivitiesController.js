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
  createActivity: () => createActivity,
  deleteActivity: () => deleteActivity,
  getActivities: () => getActivities,
  getActivityById: () => getActivityById,
  updateActivity: () => updateActivity
});
var import_Activities = __toModule(require("../models/Activities.js"));
const getActivities = async (req, res) => {
  try {
    const activities = await import_Activities.default.findAll();
    res.status(200).json({
      "status": "Success",
      "message": "Success",
      "data": activities
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getActivityById = async (req, res) => {
  try {
    const id = req.params.id;
    const activity = await import_Activities.default.findOne({ where: { id } });
    if (activity == null) {
      return res.status(404).json({
        "status": "Not Found",
        "message": `Activity with ID ${id} Not Found`
      });
    }
    res.status(200).json({
      "status": "Success",
      "message": "Success",
      "data": activity
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const createActivity = async (req, res) => {
  try {
    const title = req.body.title;
    const email = req.body.email;
    if (title == null) {
      return res.status(400).json({
        "status": "Bad Request",
        "message": "title cannot be null"
      });
    }
    const createActivity2 = await import_Activities.default.create({
      title,
      email
    });
    res.status(201).json({
      "status": "Success",
      "message": "Success",
      "data": createActivity2
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateActivity = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const activity = await import_Activities.default.findOne({ where: { id } });
  if (activity == null) {
    return res.status(404).json({
      "status": "Not Found",
      "message": `Activity with ID ${id} Not Found`
    });
  } else if (title == null || title == void 0) {
    return res.status(400).json({
      "status": "Bad Request",
      "message": "Title cannot be null"
    });
  }
  await import_Activities.default.update({
    title
  }, {
    where: { id }
  });
  const activityUpdate = await import_Activities.default.findOne({ where: { id } });
  res.status(200).json({
    "status": "Success",
    "message": "Success",
    "data": activityUpdate
  });
};
const deleteActivity = async (req, res) => {
  const id = req.params.id;
  const activity = await import_Activities.default.findOne({ where: { id } });
  if (activity == null) {
    return res.status(404).json({
      "status": "Not Found",
      "message": `Activity with ID ${id} Not Found`
    });
  }
  await import_Activities.default.destroy({ where: { id } });
  res.status(200).json({
    "status": "Success",
    "message": "Success"
  });
};