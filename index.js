import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRouter from "./Routes/UserRoutes.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import ListingRouter from "./Routes/ListingRoutes.js";
import path from "path";
import cors from "cors";
dotenv.config();
const PORT=process.env.PORT ||"3000";
const app = express();
const _dirname = path.resolve();



if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => console.log(error.message));
} else {
  console.log("Using existing mongoose connection");
}
 app.use(cors({
  origin: "https://mern-estate-frontend-delta.vercel.app",
  credentials: true
}));
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
  const statusCode = error.statusCode || 500;
  const message = error.message;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
// if(process.env.NODE_ENV !=='production'){
// app.listen(PORT, () => {
//   console.log("server is listening");
// });
// }
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log("server is listening on local machine");
  });
}   
export default app