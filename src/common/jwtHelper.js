import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'foooo';

const generateToken = (user) => {
    const expiresTime = 10 * 60 * 1000; //10min
    const token = jwt.sign({
        userId: user._id,
        userName: user.name,
        email: user.email,
    }, JWT_SECRET, { expiresIn: expiresTime });
    return {
        token,
        expiresBy: Date.now() + expiresTime 
    };
};

module.exports = {
    generateToken
}
