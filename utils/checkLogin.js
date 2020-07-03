const jwt = require("jsonwebtoken");
const Users = require("../model/User");

const checkLogin = () => {
  return async (req, res, next) => {
    try {
      const auth = await new Promise((resolve, reject) => {
        jwt.verify(req.headers.authorization, "nyongpenyi", (err, auth) => {
          if (err) reject(new Error("Login Dulu"));
          resolve(auth);
        });
      });
      console.log(auth, "ini authhhhh");
      if (auth) {
        const result = await Users.findOne({username: auth.username});
        if (result) {
          role = result.role;
          name = result.name ? result.name : '';
          address = result.address ? result.address : '';
          next();
        }
      }
    } catch (e) {
      next(e);
    }
  };
};
module.exports = checkLogin;