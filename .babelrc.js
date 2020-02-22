module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  env: {
    production: {
      plugins: [
        "babel-plugin-dev-expression",
        "@babel/plugin-transform-react-constant-elements",
        "@babel/plugin-transform-react-inline-elements",
        "babel-plugin-transform-react-remove-prop-types"
      ]
    },
    development: { plugins: ["react-hot-loader/babel"] }
  }
};
