const checkAdmin = () => {
  return (req, res, next) => {
    try {
      if (req.role === "admin") {
        next();
      } else {
        throw new Error("Anda bukan admin");
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports = checkAdmin;
