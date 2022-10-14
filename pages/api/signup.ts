import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import prisma from '../../lib/prisma';
import { createCookie } from '../../helper/create-cookie';

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

    const cookie = createCookie(email, user.id);
    res.setHeader('Set-Cookie', cookie);

    delete user.password;

    res.status(201).json({ status: 'success', data: { user } });
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'error', data: { message: 'User already exists.' } });
  }
}
