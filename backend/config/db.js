import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.URI);
    console.log(`Mongodb connected at ${con.connection.host}`);
  } catch (error) {
    console.log(`Mongodb failed`, error);
  }
};

export default connectDb;
