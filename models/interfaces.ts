import { Playlist, Song } from '@prisma/client';

interface IArtist {
  name: string;
  id: string;
}

type SongWithArtist = Song & { artist: IArtist };

interface ISongs {
  songs: SongWithArtist[];
}

export type IProps = Playlist & ISongs;
