import mongoose from "mongoose";
console.log(process.env.DB_URI);

const connection = {};

export const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};
