// created it to combine all the models from user.js and branch.js

import { Branch } from "./branch.js";
import { Admin, Customer, DeliveryPartner } from "./user.js";
import { Product } from "./product.js";
import { Category } from "./category.js";
import { Order } from "./order.js";
import { Counter } from "./counter.js";

export {
  Branch,
  Customer,
  Admin,
  DeliveryPartner,
  Category,
  Product,
  Order,
  Counter,
};
