const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const AppError = require("./utils/appError");
const globaErrorHandler = require("./controllers/errorController");
const healthcareRouter = require("./routes/healthRoutes");
const userRouter = require("./routes/userRoutes");
const adminsRouter = require("./routes/adminsRoutes");

const app = express();

// 1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, try again later",
});

app.use("/api", limiter);

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello Devs 😊");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use("/api/v1/healthcares", healthcareRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globaErrorHandler);

module.exports = app;
