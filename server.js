const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then((con) => {
    console.log(con.connection);
    console.log("DB connection successful☑️");
  });

  const healthSchema = new mongoose.Schema({
    name: 
  })


const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});
