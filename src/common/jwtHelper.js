import jwt from 'jsonwebtoken';

import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || 'foooo';

const generateToken = (user) => {
    const expiresTime = 0.5 * 60 * 1000; //2min - Developement Purpose
    const token = jwt.sign({
        userId: user._id,
        userName: user.name,
        email: user.email,
        exp: expiresTime,
    }, JWT_SECRET);
    return {
        token,
        TokenExpiresBy: Date.now() + expiresTime
    };
};

const generateTokenByUserId = async userId => {
    const user = await User.findById(userId);
    console.log(user, userId);
    if(!user) throw new Error("Invalid User");
    return generateToken(user);
};

const generateRefreshToken = (userId) => {
    const expiresTime = 15 * 60 * 1000; //15min - Developement Purpose
    return jwt.sign({
        userId: userId,
        exp: expiresTime,
    }, JWT_SECRET);
};

const getDecodedTokenIfValid = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return false;
    }
};

module.exports = {
    generateToken,
    generateRefreshToken,
    getDecodedTokenIfValid,
    generateTokenByUserId
}
