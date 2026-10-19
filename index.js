import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import User from "./models/User.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(409).send("Username уже зареган");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).send("User зареган");
  } catch (error) {
    res.status(500).send("User не зареган");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).send("Username or password is invalid");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Username or password is invalid");
    }

    res.status(200).send("Успешно зашел в профиль");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
