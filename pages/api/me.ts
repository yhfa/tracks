import { vaildateRoute } from '../../lib/auth';
import prisma from '../../lib/prisma';

export default vaildateRoute(async (req, res, user) => {
  const playlistCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        ...user,
        playlistCount,
      },
    },
  });
});
