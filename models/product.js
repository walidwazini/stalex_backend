const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
}, { timestamps: true, })

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    image: {
      type: [String],
    },
    description: {
      type: String,
      // required: true,
    },
    // reviews: [ReviewSchema],
    rating: {
      type: Number,
      // required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      // required: true,
      default: 0,
    },
    price: {
      type: Number,
      // required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', ProductSchema)