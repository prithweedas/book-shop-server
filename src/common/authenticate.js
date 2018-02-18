import throwNewHttpError from "./throwNewHttpError";
import * as jwtHelper from "./jwtHelper";

const authenticate = async (req, res, next) => {
  const token = req.header("token");
  const refreshToken = req.header("refreshToken");

  const authResult = await checkAuthentication(token, refreshToken);

  if (authResult.error) {
    return next(throwNewHttpError(authResult.error, 401));
  }

  res.set({
    token: authResult.token,
    refreshToken: authResult.refreshToken
  });

  req.userId = authResult.userId;
  req.userEmail = authResult.userEmail;

  next();
};

export const setAuthentication = async (req, res, next) => {
  const token = req.header("token");
  const refreshToken = req.header("refreshToken");

  const authResult = await checkAuthentication(token, refreshToken);

  if (authResult.error) {
    return next();
  }

  res.set({
    token: authResult.token,
    refreshToken: authResult.refreshToken
  });

  req.userId = authResult.userId;
  req.userEmail = authResult.userEmail;

  next();
};

const checkAuthentication = async (token, refreshToken) => {
  if (!token) return { error: "Token is not provided" };

  let decodedToken = jwtHelper.getDecodedTokenIfValid(token);
  const decodedRefreshToken = jwtHelper.getDecodedTokenIfValid(refreshToken);

  if (!decodedToken && !decodedRefreshToken) return { error: "Token expried" };

  if (!decodedToken) {
    const tokenResult = await jwtHelper.generateTokenByUserId(
      decodedRefreshToken.userId
    );

    //updating paramenter variables
    token = tokenResult.token;
    refreshToken = await jwtHelper.generateRefreshToken(
      decodedRefreshToken.userId
    );

    decodedToken = jwtHelper.getDecodedTokenIfValid(tokenResult.token);
  }

  console.log("doooooooooooooo");
  return {
    ok: true,
    token,
    refreshToken,
    userId: decodedToken.userId,
    userEmail: decodedToken.email
  };
};

export default authenticate;
