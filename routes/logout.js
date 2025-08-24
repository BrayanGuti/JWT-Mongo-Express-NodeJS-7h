import express from "express";
import logoutController from "../controllers/logout.controller.js";

const router = express.Router();

router.get("/", logoutController);

export default router;
