import jwt, { verify } from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.Authorization &&
    req.headers.Authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.Authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      throw new Error("Token is not authorized", error);
    }
  } else {
    throw new Error(`Token not Found`);
  }
};

export { protect };
