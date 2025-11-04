import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected");
  } catch (error) {
    console.log(error, "Failed to connect");
  }
};

export default connectMongo;
