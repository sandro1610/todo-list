var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
var import_express = __toModule(require("express"));
var import_cors = __toModule(require("cors"));
var import_dotenv = __toModule(require("dotenv"));
var import_db_config = __toModule(require("./config/db.config.js"));
var import_ActivitiesRoutes = __toModule(require("./routes/ActivitiesRoutes.js"));
var import_TodosRoutes = __toModule(require("./routes/TodosRoutes.js"));
import_dotenv.default.config();
const app = (0, import_express.default)();
import_db_config.default.sync({ force: true });
app.use((0, import_cors.default)({
  credentials: true,
  origin: "*"
}));
app.use(import_express.default.json());
app.use(import_ActivitiesRoutes.default);
app.use(import_TodosRoutes.default);
app.listen(process.env.APP_PORT, () => {
  console.log("listening on port " + process.env.APP_PORT);
});
import_db_config.default.authenticate().then(() => {
  console.log("Database authenticated");
}).catch((err) => {
  console.error("Unable to connect to the database:", err);
});