// linter
// eslint = linter le plus courant
// Permet de forcer la mise en forme du code selon les conventions

module.exports = {
  env: {
    commonjs: true,
    es2019: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
