import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { chain } from 'underscore';

import database from '@/middlewares/database';
import { NextApiRequestWithDb } from '@/middlewares/database/model';
import { PostSchema } from '@/models/post';

const COLLECTION = 'posts';

const router = createRouter<NextApiRequestWithDb, NextApiResponse>();

router
  .use(database)
  .post(async (req, res) => {
    const collection = req.db.collection<PostSchema>(COLLECTION);
    const now = new Date().toISOString();
    const doc = JSON.parse(JSON.stringify({ ...req.body, createdAt: now, updatedAt: now }));

    try {
      const { insertedId } = await collection.insertOne(doc);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end({ data: { uid: insertedId.toString() } });
    } catch (error) {
      res.end(error);
    }
  })
  .get(async (req, res) => {
    const collection = req.db.collection<PostSchema>(COLLECTION);

    const findResult = await collection.find({}).toArray();
    const data = findResult.map((item) => (chain(item).extend({ uid: item._id.toString() }).omit('_id').value()));

    res.json({ data });
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
