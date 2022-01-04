const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/*",
    createProxyMiddleware({
      target: "https://pesto-workation-be.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
