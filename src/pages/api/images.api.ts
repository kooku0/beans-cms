import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .post(async (req, res) => {
    console.log(Object.keys(req.body));
    res.end('ok');
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    const { method } = req;

    res.status(404).end(`${method?.toUpperCase()} is not supported`);
  },
});
