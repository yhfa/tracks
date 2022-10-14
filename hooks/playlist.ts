import useSWR from 'swr';
import { Playlist } from '@prisma/client';
import fetcher from '../lib/fetcher';

export const usePlaylist = () => {
  const { data, error } = useSWR<{ playlists: Playlist[] }>(
    '/playlist',
    fetcher
  );

  return {
    playlists: data?.playlists || [],
    error,
    isLoading: !data && !error,
  };
};
