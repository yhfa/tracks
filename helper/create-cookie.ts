import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export function createCookie(email: string, id: number) {
  const token = jwt.sign(
    { email, id, time: Date.now() },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPRIES_IN,
    }
  );

  return cookie.serialize(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}
