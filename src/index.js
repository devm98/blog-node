const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
// const morgan = require("morgan");
const handlebars = require("express-handlebars");
const dayjs = require("dayjs");

const db = require("./config/db");
db.connect();

const sortMiddleware = require("./app/middlewares/SortMiddleware");

const app = express();
const port = 3000;
const route = require("./routes");

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app logger
// app.use(morgan("combined"));

app.use(sortMiddleware);

// templates engine
app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      formatDate: (date) => dayjs(date).format("HH:mm:ss DD/MM/YYYY"),
      sortable: (filed, sort) => {
        const sortType = filed === sort.column ? sort.type : "default";

        const icons = {
          default: "fa-solid fa-sort",
          asc: "fa-solid fa-arrow-up-wide-short",
          desc: "fa-solid fa-arrow-down-wide-short",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${filed}&type=${type}">
          <i class="${icon}" role="button"></i>
        </a>`;
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

route(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
