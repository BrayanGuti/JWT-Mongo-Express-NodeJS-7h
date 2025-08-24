import usersData from "../model/users.json" with { type: "json" };
import { promises } from "fs";
import path from "path";
import bcrypt from "bcrypt";

const userDB = {
  users: usersData,
  setUsers: function (data) {
    this.users = data;
  },
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res.status(400).json({
      error: "user and password are required",
    });

  const duplicate = userDB.users.find((person) => person.username === user);

  if (duplicate)
    return res.status(409).json({
      error: "usersname already taked",
    });
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = {
      username: user,
      password: hashedPwd,
      roles: {
        User: 2001,
      },
    };
    userDB.setUsers([...userDB.users, newUser]);

    await promises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB);
    res.status(201).json({ message: "user created successfully" });
  } catch (e) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

export default handleNewUser;
