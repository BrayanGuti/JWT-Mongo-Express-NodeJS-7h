import User from "../model/User.js";
import bcrypt from "bcrypt";

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res.status(400).json({
      error: "user and password are required",
    });

  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate)
    return res.status(409).json({
      error: "usersname already taked",
    });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);
    res.status(201).json({ message: "user created successfully" });
  } catch (e) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

export default handleNewUser;
