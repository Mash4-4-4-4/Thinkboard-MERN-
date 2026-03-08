 //connecting databse
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    })

    console.log("MongoDB Connected Successfully")

  } catch (error) {
    console.error("Initial Connection Failed:", error.message)
    process.exit(1)
  }

  // 🔥 Connection Events
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB")
  })

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err.message)
  })

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose disconnected from DB")
  })

  // Optional: Close connection properly when app shuts down
  process.on("SIGINT", async () => {
    await mongoose.connection.close()
    console.log("Mongoose connection closed due to app termination")
    process.exit(0)
  })
}