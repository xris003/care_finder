const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const { create } = require("domain");

const app = express();

// 1) MIDDLEWARES
app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello Devs 😊");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLERS

const healthcare = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/clinics.json`)
);

const getAllHealthCares = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: healthcare.length,
    data: {
      healthcare,
    },
  });
};

const getHealthCare = (req, res) => {
  res.status(200).json({
    status: "success",
    results: healthcare.length,
    data: {
      healthcare,
    },
  });
};

const createHealthCare = (req, res) => {
  console.log(req.body);
  res.send("Done");
};

const updateHealthCare = (req, res) => {
  res.status(200).json({
    data: {
      healthcare,
    },
  });
};

const deleteHealthCare = (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      healthcare: "<deleted healthcare here...>",
    },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};

const healthcareRouter = express.Router();
const userRouter = express.Router();
// app.get("/api/v1/healthcares", getAllHealthCares);
// app.get("/api/v1/healthcares/:id", getHealthCare);
// app.post("/api/v1/healthcares", createHealthCare);
// app.patch("/api/v1/healthcares/:id", updateHealthCare);
// app.delete("/api/v1/healthcares/:id", deleteHealthCare);

// 3) ROUTES

healthcareRouter.route("/").get(getAllHealthCares).post(createHealthCare);

healthcareRouter
  .route("/:id")
  .get(getHealthCare)
  .patch(updateHealthCare)
  .delete(deleteHealthCare);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/healthcares", healthcareRouter);
app.use("/api/v1/users", userRouter);

// 4) START SERVER
const port = 3002;
app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});
