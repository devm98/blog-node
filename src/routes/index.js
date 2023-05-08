const newsRouter = require("../routes/news");
const siteRouter = require("../routes/site");
const courseRouter = require("../routes/course");

const route = (app) => {
  app.use("/courses", courseRouter);
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
};

module.exports = route;
