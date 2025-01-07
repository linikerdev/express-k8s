import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Essa é uma pagina de teste para kubernetes");
});

const mongoUri = "mongodb://mongo:27017/testdb";

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (err) {
    console.error("Error fetching user", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/user", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    console.log('newUser', newUser)
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});