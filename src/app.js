import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import itemRoutes from "./routes/items";
import userRoutes from "./routes/users";

const app = express();

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
  res.status(error.status || 500);
  res.json({
    ok: false,
    error: {
      message: error.message || "Internal Server Error"
    }
  });
});

export default app;
