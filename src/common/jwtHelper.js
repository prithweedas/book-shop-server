import jwt from "jsonwebtoken";

import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "foooo";

export const generateToken = user => {
  const expiresTime = Math.floor(Date.now() / 1000) + 1 * 60; //1min - Developement Purpose
  const token = jwt.sign(
    {
      userId: user._id,
      userName: user.name,
      email: user.email,
      exp: expiresTime
    },
    JWT_SECRET
  );
  return {
    token,
    TokenExpiresBy: expiresTime * 1000
  };
};

export const generateTokenByUserId = async userId => {
  const user = await User.findById(userId);
  console.log(user, userId);
  if (!user) throw new Error("Invalid User");
  return generateToken(user);
};

export const generateRefreshToken = userId => {
  const expiresTime = Math.floor(Date.now() / 1000) + 15 * 60; //15min - Developement Purpose
  return jwt.sign(
    {
      userId: userId,
      exp: expiresTime
    },
    JWT_SECRET
  );
};

export const getDecodedTokenIfValid = token => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
};
