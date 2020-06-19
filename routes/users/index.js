const router = require("express").Router();
const Users = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER MEMBERS
router.post("/register-member", async (req, res, next) => {
  try {
    console.log("Masuk Register");
    const newUser = new Users({
      role: "member",
      name: req.body.name,
      username: req.body.username,
      address: req.body.address
    });
    console.log("udah isi username");
    const hash = await bcrypt.hash(req.body.password, 10);
    newUser.password = hash;
    console.log("Udah isi password");
    const savedMember = await newUser.save();
    return res.json({ msg: "Success Register", data: savedMember });
  } catch (e) {
    next(e);
  }
});

// LOGIN MEMBERS
router.post("/login-member", async (req, res, next) => {
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
        const roleType = {
          role: result.role
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
          role: roleType.role
        });
      }
    }
    throw new Error("username or password wrong");
  } catch (e) {
    next(e);
  }
});

// GET MEMBERS
router.get("/get-member", async (req, res, next) => {
  try {
    const data = await Users.find();
    return res.json(data);
  } catch (e) {
    next(e);
  }
});

// REGISTER ADMIN
router.post("/register-admin", async (req, res, next) => {
  try {
    const data = await Users.findOne({ role: "admin" });
    if (!data) {
      const newAdmin = new Users({
        role: "admin",
        username: "admin"
      });
      const hash = await bcrypt.hash("admin", 10);
      newAdmin.password = hash;
      const savedAdmin = await newAdmin.save();
      return res.json({ msg: "Success Create Admin", data: savedAdmin });
    }
  } catch (e) {
    next(e);
  }
});

// LOGIN ADMIN
router.post("/login-admin", async (req, res, next) => {
  try {
    const result = await Users.findOne({ username: "admin" });
    if (result) {
      const isMatch = await bcrypt.compare(req.body.password, result.password);
      if (isMatch) {
        console.log(isMatch, "ini isMatch");
        const payload = {
          username: result.username
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
          role: result.role
        });
      }
      throw new Error("Wrong Password");
    }
    throw new Error("Admin not created yet");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
