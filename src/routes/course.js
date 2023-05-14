const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

router.post("/handle-form-actions", courseController.handleFormActions);
router.post("/store", courseController.store);
router.get("/create", courseController.create);
router.get("/:id/edit", courseController.edit);
router.delete("/:id", courseController.remove);
router.delete("/:id/force", courseController.destroy);
router.put("/:id", courseController.update);
router.patch("/:id/restore", courseController.restore);
router.get("/:slug", courseController.show);
router.get("/", courseController.index);

module.exports = router;
