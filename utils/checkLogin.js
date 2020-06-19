const jwt = require("jsonwebtoken");
const Users = require("../model/User");

const checkLogin = () => {
  return async (req, res, next) => {
    try {
      const auth = await new Promise((resolve, reject) => {
        jwt.verify(req.headers.authorization, "nyongpenyi", (err, auth) => {
          // console.log(err, 'ini err')
          if (err) reject(new Error("Login Dulu"));
          resolve(auth);
        });
      });
      console.log(auth, "ini authhhhh");
      if (auth) {
        const result = await Users.findOne({username: auth.username});
        if (result) {
          req.role = result.role;
          next();
        }
      }
    } catch (e) {
      next(e);
    }
  };
};
module.exports = checkLogin;
