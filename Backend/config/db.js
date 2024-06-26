import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aj_abhijeetsingh:pulsar150@cluster0.1d8wqln.mongodb.net/food-del').then(() => console.log("DB connection established"))
}


export default connectDB;