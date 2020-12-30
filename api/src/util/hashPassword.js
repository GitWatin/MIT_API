const crypto = require("crypto");

const hashPassword = (password = "") =>
  crypto
    .createHash("sha256")
    .update(`m4sb0UlnMH${password}bpf9PltqY6`)
    .digest("base64");

module.exports = hashPassword;
