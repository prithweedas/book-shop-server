import throwNewHttpError from "./throwNewHttpError";
import * as jwtHelper from "./jwtHelper";

const authenticate = async (req, res, next) => {
  const token = req.header("token");
  const refreshToken = req.header("refreshToken");

  const authResult = await getAuthDetails(token, refreshToken);

  if (authResult.error) {
    return next(throwNewHttpError(authResult.error, 401));
  }

  setAuthDeatilsToReqAndRes(req, res, authResult);
  next();
};

export const checkAuthentication = async (req, res, next) => {
  const token = req.header("token");
  const refreshToken = req.header("refreshToken");

  const authResult = await getAuthDetails(token, refreshToken);

  if (!authResult.error) {
    setAuthDeatilsToReqAndRes(req, res, authResult);
  }
  next();
};

const getAuthDetails = async (token, refreshToken) => {
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

const setAuthDeatilsToReqAndRes = (req, res, authResult) => {
  res.set({
    token: authResult.token,
    refreshToken: authResult.refreshToken
  });

  req.userId = authResult.userId;
  req.userEmail = authResult.userEmail;
};

export default authenticate;
