import { NextPage } from 'next';

import prisma from '../../lib/prisma';
import { vaildateToken } from '../../lib/auth';
import { IProps } from '../../models/interfaces';
import GradientLayout from '../../components/gradientLayout';
import SongTable from '../../components/songsTable';

const getRGBColor = id => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'gray',
    'pink',
    'purple',
    'cyan',
    'teal',
    'yellow',
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Home: NextPage<{ playlist: IProps }> = ({ playlist }) => {
  const color = getRGBColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400/?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  try {
    const id = vaildateToken(req.cookies[process.env.COOKIE_NAME]);
    const [playlist] = await prisma.playlist.findMany({
      where: {
        id: +query.id,
        userId: id,
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return {
      props: { playlist },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        path: '/signin',
      },
    };
  }
};

export default Home;
