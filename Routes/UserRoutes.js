import express from "express";
import { deleteUser, handleGet } from "../Controllers/UserController.js";
import { verifyUser } from "../utils/verifyUser.js";
import {
  updateUser,
  getUserListings,
  getUser,
} from "../Controllers/UserController.js";
const router = express.Router();
router.get("/test", handleGet);
router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/listings/:id", verifyUser, getUserListings);
router.get("/:id", verifyUser, getUser);
export default router;
