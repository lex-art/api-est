const bcrypt = require("bcryptjs");

const encrypt = async (pass) => {
  return await bcrypt.hash(pass, 10); // Todo <----- 10 genera un novil de encriptacion mas segura, mas alta, consume mas recursos
};

const compare = async (pass, hashPass) => {
  return await bcrypt.compare(pass, hashPass);
};

module.exports = {
  encrypt,
  compare
};
