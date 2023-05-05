const newsRouter = require("../routes/news");
const siteRouter = require("../routes/site");

const route = (app) => {
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
};

module.exports = route;
