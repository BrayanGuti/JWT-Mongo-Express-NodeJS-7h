import employees from "../model/users.json" with { type: "json" };
import fs from 'fs'

const EMPLOYEES_FILE_PATH = "./model/employees.json";

const saveEmployeesToFile = (employeesData) => {
  fs.writeFileSync(EMPLOYEES_FILE_PATH, JSON.stringify(employeesData, null, 2));
};

const findEmployeeById = (id) => {
  return employees.find((emp) => emp.id === parseInt(id));
};

const getNextEmployeeId = () => {
  return employees.length ? Math.max(...employees.map((emp) => emp.id)) + 1 : 1;
};

const sendEmployeeNotFoundError = (res, id) => {
  return res.status(400).json({ message: `Employee ID ${id} not found.` });
};

export const getAllEmployes = (_req, res) => {
  res.json(employees);
};

export const createEmployee = (req, res) => {
  const newEmployee = {
    id: getNextEmployeeId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  employees.push(newEmployee);
  saveEmployeesToFile(employees);
  res.status(201).json(newEmployee);
};

export const changeEmployeeInfo = (req, res) => {
  const employee = findEmployeeById(req.body.id);

  if (!employee) {
    return sendEmployeeNotFoundError(res, req.body.id);
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  saveEmployeesToFile(employees);
  res.json(employee);
};

export const deleteEmployee = (req, res) => {
  const employeeId = parseInt(req.body.id);
  const employee = findEmployeeById(employeeId);

  if (!employee) {
    return sendEmployeeNotFoundError(res, req.body.id);
  }

  const employeesCopy = employees.filter((emp) => emp.id !== employeeId);
  saveEmployeesToFile(employeesCopy);

  res.json({
    message: `Employee ID ${req.body.id} deleted successfully`,
    deletedEmployee: employee,
  });
};

export const getEmployeeById = (req, res) => {
  const employee = findEmployeeById(req.params.id);

  if (!employee) {
    return sendEmployeeNotFoundError(res, req.params.id);
  }

  res.json(employee);
};
