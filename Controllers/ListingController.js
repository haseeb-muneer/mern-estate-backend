import { errorHandler } from "../utils/error.js";
import Listing from "../Model/ListingModel.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json({ listing });
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Lisiting is not founded!"));
  }
  if (req.user.id !== listing.useRef) {
    return next(errorHandler(401, "You can only delete your listing!"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "listing not founded!"));
  }
  if (req.user.id !== listing.useRef) {
    return next(errorHandler(401, "you can only update your lisitngs"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
export const getListing = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const lisitng = await Listing.findById(listingId);
    if (!lisitng) {
      return next(errorHandler(404, "listing is not found!"));
    }
    res.status(200).json(lisitng);
  } catch (error) {
    next(error);
  }
};
export const getListings = async (req, res, next) => {
  try {
    console.log(req.query);
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    console.log(startIndex);
    let parking = req.query.parking;
    console.log(req.query.parking);
    if (parking === undefined || parking === "false") {
      parking = { $in: [true, false, null] };
    } else {
      parking = true;
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [true, false, null] };
    } else {
      furnished = true;
    }
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false, null] };
    } else {
      offer = true;
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }
    let searchTerm = req.query.searchTerm || "";
    let sort = req.query.sort || "createdAt";
    let order = req.query.order || "desc";
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      parking,
      furnished,
      type,
    })
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(listings);
    console.log(listings);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
