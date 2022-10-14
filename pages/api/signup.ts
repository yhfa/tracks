import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import prisma from '../../lib/prisma';

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });

    const token = jwt.sign(
      { email, id: user.id, time: Date.now() },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPRIES_IN,
      }
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('TRACKS_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN),
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    );

    res.status(201).json({ status: 'success', data: { user } });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: 'error', data: { message: 'User already exists.' } });
  }
}
