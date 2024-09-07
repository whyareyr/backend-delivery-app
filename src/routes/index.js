//is mai centralised routes rahenge

import { authRoutes } from "./auth.js";
import { categoryRoutes, productRoutes } from "./product.js";

const prefix = "/api";

export const registerRoutes = async (fastify) => {
  fastify.register(authRoutes, { prefix: prefix });
  fastify.register(productRoutes, { prefix: prefix });
  fastify.register(categoryRoutes, { prefix: prefix });
};
