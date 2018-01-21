import throwNewHttpError from "./throwNewHttpError";
import * as jwtHelper from "./jwtHelper";

const authenticate = async (req, res, next) => {
  const token = req.header("token");
  const refreshToken = req.header("refreshToken");

  if (!token) return next(throwNewHttpError("Token is not provided", 401));

  let decodedToken = jwtHelper.getDecodedTokenIfValid(token);
  const decodedRefreshToken = jwtHelper.getDecodedTokenIfValid(refreshToken);

  if (!decodedToken && !decodedRefreshToken)
    return next(throwNewHttpError("Token expried", 401));

  if (!decodedToken) {
    const result = await jwtHelper.generateTokenByUserId(
      decodedRefreshToken.userId
    );
    const refreshToken = await jwtHelper.generateRefreshToken(
      decodedRefreshToken.userId
    );
    res.set({
      token: result.token,
      "token-expiresBy": result.TokenExpiresBy,
      refreshToken: refreshToken
    });
    decodedToken = jwtHelper.getDecodedTokenIfValid(result.token);
  }

  req.userId = decodedToken.userId;
  req.userEmail = decodedToken.email;

  next();
};

export default authenticate;
