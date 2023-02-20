import mongoose from "mongoose";

const dbConnection = async () => {
  console.log(process.env.MONGODB_CNN);
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error a la hora de inicializar el proceso de base de datos"
    );
  }
};

export { dbConnection };
