import { vaildateRoute } from '../../lib/auth';

export default vaildateRoute((req, res, user) => {
  res.status(200).json({ status: 'success', data: { user } });
});
