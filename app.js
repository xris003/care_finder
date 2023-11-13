const express = require("express");
const morgan = require("morgan");

const healthcareRouter = require("./routes/healthcareRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello Devs 😊");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/api/v1/healthcares", getAllHealthCares);
// app.get("/api/v1/healthcares/:id", getHealthCare);
// app.post("/api/v1/healthcares", createHealthCare);
// app.patch("/api/v1/healthcares/:id", updateHealthCare);
// app.delete("/api/v1/healthcares/:id", deleteHealthCare);

// 3) ROUTES

app.use("/api/v1/healthcares", healthcareRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
