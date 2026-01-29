import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  parking: {
    type: Number,
    required: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: Array,
    required: true,
  },
  useRef: {
    type: String,
    required: true,
  },
});
const Listing = mongoose.model("Listing", Schema);
export default Listing;
