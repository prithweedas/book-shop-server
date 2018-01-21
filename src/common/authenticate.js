import throwNewHttpError from './throwNewHttpError';
import jwtHelper from './jwtHelper';

const authenticate = async (req, res, next) => {
  const token = req.header('token');
  const refreshToken = req.header('refreshToken');

  if (!token)
    return next(throwNewHttpError('Token is not provided', 401));

  let decodedToken = jwtHelper.getDecodedTokenIfValid(token);
  const decodedRefreshToken = jwtHelper.getDecodedTokenIfValid(refreshToken);

  if (!decodedToken && !decodedRefreshToken)
    return next(throwNewHttpError('Token expried', 401));

  if (!decodedToken) {
    const result = await jwtHelper.generateTokenByUserId(decodedRefreshToken.userId);
    res.set({
      'token': result.token,
      'token-expiresBy': result.TokenExpiresBy
    });
    decodedToken = jwtHelper.getDecodedTokenIfValid(result.token);
  }

  res.userId = decodedToken.userId;
  res.email = decodedToken.email;

  next();
}

export default authenticate;