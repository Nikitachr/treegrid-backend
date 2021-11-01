const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.use("/task", require("./routes/TaskRoutes"));

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

start();
