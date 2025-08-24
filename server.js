import express from "express";
import path from "path";
import cors from "cors";
import { logger } from "./middleware/logEvents.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.js";
import subdirRouter from "./routes/subdir.js";
import rootRouter from "./routes/root.js";
import employeesRouter from "./routes/api/employees.js";
import registerRouter from "./routes/register.js";
import corsOption from "./config/corsOption.js";

const app = express();
const PORT = process.env.PORT || 3500;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// custom logger
app.use(logger);

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/subdir", subdirRouter);
app.use("/employees", employeesRouter);

app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "file not found 404" });
  } else {
    res.send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running in Port ${PORT}`));
