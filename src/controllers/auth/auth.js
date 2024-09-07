import { Customer, DeliveryPartner } from "../../models/user.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },

    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

export const loginCustomer = async (req, reply) => {
  try {
    const { phone } = req.body;
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = new Customer({
        phone,
        role: "Customer",
        isActivated: true,
      });

      await customer.save();
    } else if (!customer.isActivated) {
      return reply.status(403).send({ message: "Customer not activated" });
    }

    const { accessToken, refreshToken } = generateToken(customer);

    return reply.send({
      message: customer ? "Login Successful" : "Created",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occured", error });
  }
};

//above was not working kyonki parameters mai res tha req ki jagah
export const loginCustomerChatGpt = async (req, reply) => {
  try {
    const { phone } = req.body;

    // Find customer by phone number
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      // If customer doesn't exist, create a new one
      customer = new Customer({
        phone,
        role: "Customer",
        isActivated: true,
      });

      await customer.save();
    } else if (!customer.isActivated) {
      // If customer exists but is not activated
      return reply.status(403).send({ message: "Customer not activated" });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateToken(customer);

    return reply.send({
      message: customer ? "Login Successful" : "Created",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    // Log the actual error for better debugging
    console.error("Error during login:", error);

    return reply
      .status(500)
      .send({ message: "An error occurred", error: error.message || error });
  }
};

export const loginDeliveryPartner1 = async (res, reply) => {
  try {
    const { email, password } = req.body;
    let deliveryPartner = await DeliveryPartner.findOne({ phone });

    // agar delivery partner nahi hai toh error bhejenge cretae nahi karenge
    if (!deliveryPartner) {
      return reply
        .status(404)
        .send({ message: "Delivery partner not found", error });
    }

    if (!deliveryPartner.isActivated) {
      return reply
        .status(403)
        .send({ message: "Delivery partner not activated" });
    }

    const isMatch = password === deliveryPartner.password;

    if (!isMatch) {
      return reply.status(404).send({ message: "Invalid Credentials", error });
    }

    const { accessToken, refreshToken } = generateToken(deliveryPartner);

    return reply.send({
      message: "Login Successful",
      accessToken,
      refreshToken,
      deliveryPartner,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occured", error });
  }
};

export const loginDeliveryPartner = async (req, reply) => {
  // changed res to req
  try {
    const { email, password } = req.body;
    let deliveryPartner = await DeliveryPartner.findOne({ email }); // Query changed to email

    if (!deliveryPartner) {
      return reply.status(404).send({ message: "Delivery partner not found" });
    }

    if (!deliveryPartner.isActivated) {
      return reply
        .status(403)
        .send({ message: "Delivery partner not activated" });
    }

    const isMatch = password === deliveryPartner.password;

    if (!isMatch) {
      return reply.status(401).send({ message: "Invalid Credentials" });
    }

    const { accessToken, refreshToken } = generateToken(deliveryPartner);

    return reply.send({
      message: "Login Successful",
      accessToken,
      refreshToken,
      deliveryPartner,
    });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: "An error occurred", error });
  }
};

export const refreshToken = async (req, reply) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return reply.status(401).send({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    let user;

    if (decoded.role === "Customer") {
      user = await Customer.findById(decoded.userId);
    } else if (decoded.role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(decoded.userId);
    } else {
      return reply.status(403).send({ message: "Invalid role" });
    }

    if (!user) {
      return reply.status(403).send({ message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user);

    return reply.send({
      message: "Token Refreshed",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return reply.status(403).send({ message: "Invalid refresh token" });
  }
};

//ye route wohi access karega jiske paas access token, refresh token hoga
export const fetchUser = async (req, reply) => {
  try {
    const { userId, role } = req.user;

    let user;
    if (role === "Customer") {
      user = await Customer.findById(userId);
    } else if (role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(userId);
    } else {
      return reply.status(403).send({ message: "Invalid role" });
    }

    if (!user) {
      return reply.status(404);
    }

    return reply.send({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occured", error });
  }
};
