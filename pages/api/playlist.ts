import prisma from '../../lib/prisma';
import { vaildateRoute } from '../../lib/auth';

export default vaildateRoute(async (req, res, user) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: 'asc',
    },
  });
  res.status(200).json({ status: 'success', data: { playlists } });
});
