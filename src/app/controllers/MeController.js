const { multipleMongooseToObj } = require("../../utils/mongoose");
const Course = require("../models/Course");

class MeController {
  async storedCourses(req, res, next) {
    try {
      let courses = Course.find();

      if (req.query.hasOwnProperty("_sort")) {
        courses = courses.sort({
          [req.query.column]: req.query.type,
        });
      }

      courses = await courses;
      const deletedCount = await Course.countDocumentsDeleted();
      res.render("me/stored-courses", {
        courses: multipleMongooseToObj(courses),
        deletedCount,
      });
    } catch (error) {
      next(error);
    }
  }
  async trashCourses(req, res, next) {
    try {
      const courses = await Course.findDeleted();
      const deletedCount = await Course.countDocumentsDeleted();
      res.render("me/trash-courses", {
        courses: multipleMongooseToObj(courses),
        deletedCount,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
