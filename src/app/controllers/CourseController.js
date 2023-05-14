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
      res.redirect("/courses");
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const courseFound = await Course.findById(req.params.id);
      res.render("courses/edit", mongooseToObj(courseFound));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      await Course.updateOne({ _id: req.params.id }, req.body);
      res.redirect("/me/stored/courses");
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      await Course.delete({ _id: req.params.id });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      await Course.deleteOne({ _id: req.params.id });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  async restore(req, res, next) {
    try {
      await Course.restore({ _id: req.params.id });
      res.redirect("back");
    } catch (error) {
      next(error);
    }
  }

  async handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        await Course.delete({
          _id: {
            $in: req.body.courseIds,
          },
        });
        res.redirect("back");
        return;
      default:
        res.json({ message: "Action is invalid!" });
        return;
    }
  }
}

module.exports = new CourseController();
