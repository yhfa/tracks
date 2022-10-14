import useSWR from 'swr';
import { User } from '@prisma/client';

import fetcher from '../lib/fetcher';

export const useMe = () => {
  const { data, error } = useSWR<{ user: User }>('/me', fetcher);

  return {
    playlists: data?.user,
    error,
    isLoading: !data && !error,
  };
};
