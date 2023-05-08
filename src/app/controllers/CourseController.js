const {
  multipleMongooseToObj,
  mongooseToObj,
} = require("../../utils/mongoose");
const Course = require("../models/Course");

class CourseController {
  async index(req, res, next) {
    try {
      const courses = await Course.find();
      res.render("courses", { courses: multipleMongooseToObj(courses) });
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const course = await Course.findOne({
        slug: req.params.slug,
      });
      res.render("courses/detail", mongooseToObj(course));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    res.render("courses/create");
  }

  async store(req, res, next) {
    try {
      const formData = req.body;
      formData.image = `https://img.youtube.com/vi/${formData.vidId}/sddefault.jpg`;
      await Course.create(formData);
      console.log("Create course successfully!!!");
      res.redirect("/courses");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseController();
