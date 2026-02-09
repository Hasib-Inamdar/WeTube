import "dotenv/config";
import connectDB from "./db/index.js";

console.log("In main index page");

connectDB();

// const connectDB = () => {};
// connectDB();
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

//     app.on("error", (error) => {
//       console.log("Error:", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error: ", error);
//     throw error;
//   }
// })();
