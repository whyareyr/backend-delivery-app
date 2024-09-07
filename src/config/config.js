// Load environment variables from .env file
import "dotenv/config";

// Import Fastify session plugin and MongoDB session store connector
import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";

// Import Admin model (assuming it's related to the user/authentication)
import { Admin } from "../models/index.js";

// Create a MongoDB store that will store session data in the "sessions" collection
const MongoDBStore = ConnectMongoDBSession(fastifySession);

// Initialize the MongoDB session store with a MongoDB URI and specify the collection
export const sessionStore = new MongoDBStore({
  uri: process.env.DBURI, // MongoDB connection string from .env file
  collection: "sessions", // Collection to store session data
});

// Handle potential errors from the session store
sessionStore.on("error", (error) => {
  console.log("Session store error", error); // Log session store errors
});

// Function to authenticate users (currently hardcoded for simplicity)
export const authenticate = async (email, password) => {
  // Check if the email and password match hardcoded credentials
  // if (email === "yoosharaza29@yahoo.com" && password === "12345678") {
  //   // If they match, return a resolved promise with user data
  //   return Promise.resolve({ email: email, password: password });
  // } else {
  //   // If they don't match, return null
  //   return null;
  // }

  if (email && password) {
    const user = await Admin.findOne({ email });

    if (!user) return null;

    if (user.password === password) {
      return Promise.resolve({ email: email, password: password });
    } else {
      return null;
    }
  }

  return null;
};

// Server port from environment variables or default to 3000
export const PORT = process.env.PORT || 3000;

// Cookie password used to sign and verify session cookies
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;
