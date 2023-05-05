class NewsController {
  //[GET] /news
  index(req, res) {
    res.render("news");
  }

  detail(req, res) {
    res.send(`<p class='text-danger'>Detail</p>`);
  }
}

module.exports = new NewsController();
