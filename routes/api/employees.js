import express from "express";
import {
  changeEmployeeInfo,
  createEmployee,
  deleteEmployee,
  getAllEmployes,
  getEmployeeById,
} from "../../controllers/employees.controller.js";

const employeesRouter = express.Router();

employeesRouter
  .route("/")
  .get(getAllEmployes)
  .post(createEmployee)
  .put(changeEmployeeInfo)
  .delete(deleteEmployee);

employeesRouter.route("/:id").get(getEmployeeById);

export default employeesRouter;
