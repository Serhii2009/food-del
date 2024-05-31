import mongoose from 'mongoose'

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://serhiikravchenko:FPVrhxD9hSacxP@cluster0.db5nqhv.mongodb.net/food-del'
    )
    .then(() => console.log('DB Connected'))
}
