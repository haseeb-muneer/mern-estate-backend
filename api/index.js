import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRouter from "./Routes/UserRoutes.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import ListingRouter from "./Routes/ListingRoutes.js";
import path from "path";
dotenv.config();
const PORT=process.env.PORT ||"3000";
const app = express();
const _dirname = path.resolve();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Databse is connected");
  })
  .catch((error) => console.log(error.message));
  console.log(process.env.MONGO);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/listing", ListingRouter);

// app.use(express.static(path.join(_dirname, "/Client/dist")));
// app.use((req, res) => {
//   res.sendFile(path.join(_dirname, "Client", "dist", "index.html"));
// });
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 5000;
  const message = error.message;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
if(process.env.NODE_ENV !=='production'){
app.listen(PORT, () => {
  console.log("server is listening");
});
}
export default app;