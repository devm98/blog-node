const mongoose = require("mongoose");
const { Schema } = mongoose;

const slug = require("mongoose-slug-generator");
const mongoose_delete = require("mongoose-delete");

const { AutoIncrementID } = require("@typegoose/auto-increment");

const Course = new Schema(
  {
    _id: Number,
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
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

Course.plugin(AutoIncrementID, {});

Course.plugin(mongoose_delete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Course", Course);
