import { User } from '@prisma/client';
import fetcher from './fetcher';

export const auth = (
  mode: 'signup' | 'signin',
  body: { email: string; password: string }
) => {
  return fetcher<User>(`/${mode}`, body);
};
