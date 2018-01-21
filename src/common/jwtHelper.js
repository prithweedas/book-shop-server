import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'foooo';

const generateToken = (user) => {
    const expiresTime = 2 * 60 * 1000; //2min - Developement Purpose
    const token = jwt.sign({
        userId: user._id,
        userName: user.name,
        email: user.email,
    }, JWT_SECRET, { expiresIn: expiresTime });
    return {
        token,
        TokenExpiresBy: Date.now() + expiresTime,
        refreshToken : generateRefreshToken(user),
    };
};

const generateRefreshToken = (user) => {
    const expiresTime = 15 * 60 * 1000; //15min - Developement Purpose
    return jwt.sign({
        userId: user._id,
    }, JWT_SECRET, { expiresIn: expiresTime });
};

module.exports = {
    generateToken
}
