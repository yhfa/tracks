import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import prisma from '../../lib/prisma';
import { createCookie } from '../../helper/create-cookie';

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const cookie = createCookie(email, user.id);

    res.setHeader('Set-Cookie', cookie);

    delete user.password;

    res.status(200).json({ status: 'success', data: { user } });
  } else {
    return res
      .status(401)
      .json({ status: 'error', data: { message: 'Credentials are wrong.' } });
  }
}
