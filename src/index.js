import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});
console.log("In main index page");

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error at listining at port: ", error);
      throw new Error("Error at listining at port: ", error);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at ${process.env.PORT} port`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connect error!", err);
  });
