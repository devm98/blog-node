const mongoose = require("mongoose");
const { Schema } = mongoose;

const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Course = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      slug: "name",
    },
    description: { type: String },
    vidId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", Course);
