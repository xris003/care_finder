const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).send("Hello form the server side!");
// });
const clinics = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/clinics.json`)
);

const getAllHealthCares = (req, res) => {
  res.status(200).json({
    status: "success",
    results: clinics.length,
    data: {
      clinics,
    },
  });
};

const getHealthCare = (req, res) => {
  res.status(200).json({
    status: "success",
    results: clinics.length,
    data: {
      clinics,
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
      tour,
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

// app.get("/api/v1/healthcares", getAllHealthCares);
// app.get("/api/v1/healthcares/:id", getHealthCare);
// app.post("/api/v1/healthcares", createHealthCare);
// app.patch("/api/v1/healthcares/:id", updateHealthCare);
// app.delete("/api/v1/healthcares/:id", deleteHealthCare);

app.route("/api/v1/healthcares").get(getAllHealthCares).post(createHealthCare);

app
  .route("/api/v1/healthcares/:id")
  .get(getHealthCare)
  .patch(updateHealthCare)
  .delete(deleteHealthCare);

const port = 3002;
app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});
