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

// CROS - For Now all allowed 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Expose-Headers', 'token, refreshToken, token-expiresby');

  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
      res.header('Access-Control-Max-Age', 5*24*60*60); //5 days :D
      return res.status(200).json({});
  }
  next();
});


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
