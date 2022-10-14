import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';

import prisma from './prisma';

/* eslint-disable no-unused-vars */
type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => Promise<void> | void;

export const vaildateRoute = (handler: Handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[process.env.COOKIE_NAME];

    try {
      if (token) {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
          throw new Error('Not Vaild token!');
        }

        handler(req, res, user);
      } else throw new Error('No token associated');
    } catch (error) {
      console.error(error.message);
      res
        .status(401)
        .json({ status: 'error', data: { message: 'Not Authorized' } });
    }
  };
};
