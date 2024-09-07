import "dotenv/config"; // needed to find DBURI from .env
import Fastify from "fastify"; // "type" in package.json module to import like this
import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";
const start = async () => {
  await connectDB(process.env.DBURI);
  const app = Fastify();

  await registerRoutes(app);

  await buildAdminRouter(app);

  // const PORT = process.env.PORT || 3000;
  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `Blinking Started on http://localhost:${PORT}${admin.options.rootPath}`
      );
    }
  });
};

start();
