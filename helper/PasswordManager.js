const bcrypt = require("bcrypt");

const hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashedPassword, comparePassword }