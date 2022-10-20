import useSWR from 'swr';
import { User } from '@prisma/client';

import fetcher from '../lib/fetcher';

interface UserPlaylistCount {
  playlistCount: number;
}

export const useMe = () => {
  const { data, error } = useSWR<{ user: User & UserPlaylistCount }>(
    '/me',
    fetcher
  );

  return {
    user: data?.user,
    error,
    isLoading: !data && !error,
  };
};
