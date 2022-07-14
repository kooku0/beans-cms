import { ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import database from '@/middlewares/database';
import { NextApiRequestWithDb } from '@/middlewares/database/model';
import { PostSchema } from '@/models/post';

const COLLECTION = 'posts';

const router = createRouter<NextApiRequestWithDb, NextApiResponse>();

router
  .use(database)
  .get(async (req, res) => {
    const { uid } = req.query;
    const collection = req.db.collection<PostSchema>(COLLECTION);

    const findResult = await collection.findOne({ _id: new ObjectId(uid as string) });

    res.json({ data: { ...findResult, uid } });
  })
  .patch(async (req, res) => {
    const { uid } = req.query;
    const collection = req.db.collection<PostSchema>(COLLECTION);
    const now = new Date().toISOString();

    await collection.updateOne(
      { _id: new ObjectId(uid as string) },
      { $set: { ...req.body, updatedAt: now } },
    );

    res.status(204).end('Success updated');
  })
  .delete(async (req, res) => {
    const { uid } = req.query;
    const collection = req.db.collection<PostSchema>(COLLECTION);

    await collection.deleteOne({ _id: new ObjectId(uid as string) });

    res.status(204).end('Success deleted');
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});
