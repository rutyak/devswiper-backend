const validator = require("validator");

function validationSignup(req) {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname?.trim() || !lastname?.trim()) {
    throw new Error("Name should be valid");
  }

  if (!validator.isEmail(email?.trim())) {
    throw new Error("Please enter valid email");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error("Please use strong password");
  }

  return true;
}

module.exports = validationSignup;
