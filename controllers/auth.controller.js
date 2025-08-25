import bycript from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res.status(400).json({
      error: "user and password are required",
    });

  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser)
    return res.status(400).json({
      err: "This users does'nt exits",
    });

  const match = await bycript.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const otherUsers = userDB.users.filter(
      (person) => person.username !== foundUser.username
    );

    const currentUser = { ...foundUser, refreshToken };

    userDB.setUsers([...otherUsers, currentUser]);

    await promises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken,
    });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;
