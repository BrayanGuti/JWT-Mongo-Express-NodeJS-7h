import usersData from "../model/users.json" with { type: "json" };
import { promises } from "fs";
import path from "path";
import dotenv from "dotenv";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();

const userDB = {
  users: usersData,
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return sendStatus(204);
  }

  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: "" };

  userDB.setUsers([...otherUsers, currentUser]);
  await promises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true });
  return sendStatus(204);
};

export default handleLogout;
