const checkAdmin = () => {
  return (req, res, next) => {
    try {
      if (role === "admin") {
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
