import express from "express";
import ROLE_LIST from "../../config/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js";
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
  .post(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), createEmployee)
  .put(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), changeEmployeeInfo)
  .delete(verifyRoles(ROLE_LIST.Admin), deleteEmployee);

employeesRouter.route("/:id").get(getEmployeeById);

export default employeesRouter;
