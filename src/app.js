import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";

import itemRoutes from "./routes/items";
import userRoutes from "./routes/users";

const app = express();

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(morgan("dev"));

// all routes are below
app.use("/items", itemRoutes);
app.use("/users", userRoutes);

// 404 route & Pass error to next
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error Handler
app.use((error, req, res, next) => {
  error = error || {};
  res.status(error.status || (error.name == "ValidationError" ? 400 : 500));
  res.json({
    ok: false,
    error: {
      message: error.message || "Internal Server Error"
    }
  });
});

export default app;
