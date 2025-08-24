import express from "express";
import path from "path";

const router = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get("/test", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

export default router;
