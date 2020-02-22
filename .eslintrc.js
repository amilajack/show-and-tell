module.exports = {
  root: true,
  env: { browser: true, node: true },
  extends: ["bliss", "airbnb", "prettier"],
  rules: {
    "flowtype-errors/show-errors": "off",
    "react/jsx-filename-extension": "off"
  },
  parser: "babel-eslint",
  plugins: ["jest", "prettier"]
};
