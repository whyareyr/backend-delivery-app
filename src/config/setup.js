// Importing necessary modules
import AdminJS from "adminjs"; // AdminJS core package
import * as AdminJSMongoose from "@adminjs/mongoose"; // Mongoose adapter for AdminJS
import * as Models from "../models/index.js"; // Import all the models from the application
import AdminJSFastify from "@adminjs/fastify"; // Fastify integration for AdminJS
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js"; // Import authentication, cookie password, and session store
import { dark, light, noSidebar } from "@adminjs/themes";

// Register the Mongoose adapter with AdminJS
AdminJS.registerAdapter(AdminJSMongoose);

// Create a new instance of AdminJS and configure it
export const admin = new AdminJS({
  // Define the resources to manage in the admin panel
  resources: [
    {
      resource: Models.Customer, // Customer model
      options: {
        listProperties: ["phone", "role", "isActivated"], // Properties to display in list view
        filterProperties: ["phone", "role"], // Properties to filter by
      },
    },
    {
      resource: Models.DeliveryPartner, // DeliveryPartner model
      options: {
        listProperties: ["email", "role", "isActivated"], // Properties to display in list view
        filterProperties: ["email", "role"], // Properties to filter by
      },
    },
    {
      resource: Models.Admin, // Admin model
      options: {
        listProperties: ["email", "role", "isActivated"], // Properties to display in list view
        filterProperties: ["email", "role"], // Properties to filter by
      },
    },
    { resource: Models.Branch }, // Branch model with default settings
    { resource: Models.Product },
    { resource: Models.Category },
    { resource: Models.Order },
    { resource: Models.Counter },
  ],

  // AdminJS branding options
  branding: {
    companyName: "BlinkIt", // Branding the admin panel with a company name
    withMadeWithLove: false, // Disable the "Made with love" message in the footer
    favicon:
      "https://res.cloudinary.com/dj9tvdak0/image/upload/v1723978514/nczngxogakiqiwoqhqgj.svg",
    logo: "https://res.cloudinary.com/dj9tvdak0/image/upload/v1723978514/nczngxogakiqiwoqhqgj.svg",
  },

  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  rootPath: "/admin", // Define the root path for the admin panel
});

// Function to build the AdminJS router with authentication
export const buildAdminRouter = async (app) => {
  // Build an authenticated router with session management
  await AdminJSFastify.buildAuthenticatedRouter(
    admin, // AdminJS instance
    {
      authenticate, // Function to authenticate admin users
      cookiePassword: COOKIE_PASSWORD, // Password for signing session cookies
      cookieName: "adminjs", // Name of the cookie
    },
    app, // Fastify application instance
    {
      store: sessionStore, // Session store to keep session data in MongoDB
      saveUnintialized: true, // Save uninitialized sessions (true in this case)
      secret: COOKIE_PASSWORD, // Secret key for signing the session
      cookie: {
        httpOnly: process.env.NODE_ENV === "production", // Set HTTP-only flag for production
        secure: process.env.NODE_ENV === "production", // Set secure flag for production
      },
    }
  );
};
