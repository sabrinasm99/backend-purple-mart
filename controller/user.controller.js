const Users = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN
exports.registerAdmin = async (req, res, next) => {
  try {
    const data = await Users.findOne({ role: "admin" });
    if (!data) {
      const newAdmin = new Users({
        role: 'admin',
        username: "admin",
      });
      const hash = await bcrypt.hash("admin", 10);
      newAdmin.password = hash;
      const savedAdmin = await newAdmin.save();
      return res.json({ msg: "Success Create Admin", saved: savedAdmin });
    }
  } catch (e) {
    next(e);
  }
};

// LOGIN ADMIN
exports.loginAdmin = async (req, res, next) => {
  try {
    const result = await Users.findOne({ username: req.body.username });
    if (result) {
      const isMatch = await bcrypt.compare(req.body.password, result.password);
      if (isMatch) {
        console.log(isMatch, "ini isMatch");
        const payload = {
          username: result.username,
        };
        console.log(payload);
        const token = await new Promise((resolve, reject) => {
          jwt.sign(
            payload,
            "nyongpenyi",
            { expiresIn: "30m" },
            (err, token) => {
              if (err) reject(err);
              resolve(token);
            }
          );
        });
        return res.json({
          success: true,
          token: token,
        });
      }
      throw new Error("Wrong Password");
    }
    throw new Error("Admin not created yet");
  } catch (e) {
    next(e);
  }
};

// REGISTER MEMBER
exports.registerMember = async (req, res, next) => {
  try {
    const newUser = new Users({
      role: 'member',
      name: req.body.name,
      username: req.body.username,
      address: req.body.address
    });
    const hash = await bcrypt.hash(req.body.password, 10);
    newUser.password = hash;
    const savedMember = await newUser.save();
    return res.json({ msg: "Success Register", saved: savedMember });
  } catch (e) {
    next(e);
  }
};

// LOGIN MEMBER
exports.loginMember = async (req, res, next) => {
  try {
    const result = await Users.findOne({
      username: req.body.username
    });
    if (result) {
      const isMatch = await bcrypt.compare(req.body.password, result.password);
      if (isMatch) {
        const payload = {
          username: result.username
        };
        const token = await new Promise((resolve, reject) => {
          jwt.sign(
            payload,
            "nyongpenyi",
            { expiresIn: "30m" },
            (err, token) => {
              if (err) reject(err);
              resolve(token);
            }
          );
        });
        return res.json({
          message: "Happy Shopping",
          token: token,
          name: result.name
        });
      }
    }
    throw new Error("username or password wrong");
  } catch (e) {
    next(e);
  }
};