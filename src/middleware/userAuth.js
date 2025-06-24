const userAuth = (req, res, next) => {
  let token = "xyz";
  let authentication = token === "xz";
  if (!authentication) {
    return res.send("Invalide user auth");
  } else {
    next();
  }
};

module.exports = userAuth;
