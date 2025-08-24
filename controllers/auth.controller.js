import bycript from "bcrypt";
import usersData from "../model/users.json" with { type: "json" };

const userDB = {
  users: usersData,
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res.status(400).json({
      error: "user and password are required",
    });

  const foundUser = userDB.users.find((person) => person.username === user);

  if (!foundUser)
    return res.status(400).json({
      err: "This users does'nt exits",
    });

  const match = await bycript.compare(pwd, foundUser.password);

  if (match) {
    res.status(200).json({
      message: "Login successfully!",
    });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;
