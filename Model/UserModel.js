import express from "express";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://marketplace.canva.com/EAFqhoRVTgA/1/0/1600w/canva-grey-and-blue-cute-cartoon-anime-manga-illustrated-boy-profile-photo-avatar-u9aFvuQMzUk.jpg",
  },
});
const User = mongoose.model("User", UserSchema);
export default User;
