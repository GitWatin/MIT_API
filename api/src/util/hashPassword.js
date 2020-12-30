// Permet d'hasher un password

const crypto = require("crypto");

const hashPassword = (password = "") =>
  crypto
    .createHash("sha256")
    .update(`m4sb0UlnMH${password}bpf9PltqY6`) //les deux string random permettent d'ajouter un peu de sécurité en concatenant le vrai password avec les strings (salt)
    .digest("base64"); // encode en base64 pour diminuer la taille en DB

module.exports = hashPassword; //Export du password
