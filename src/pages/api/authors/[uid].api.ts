import { ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import database from '@/middlewares/database';
import { NextApiRequestWithDb } from '@/middlewares/database/model';
import { AuthorSchema } from '@/models/author';

const COLLECTION = 'authors';

const router = createRouter<NextApiRequestWithDb, NextApiResponse>();

router
  .use(database)
  .get(async (req, res) => {
    const { uid } = req.query;
    const collection = req.db.collection<AuthorSchema>(COLLECTION);

    const findResult = await collection.findOne({ _id: new ObjectId(uid as string) });

    res.json({ data: { ...findResult, uid } });
  })
  .patch(async (req, res) => {
    const { uid } = req.query;
    const collection = req.db.collection<AuthorSchema>(COLLECTION);

    const returnData = collection.updateOne(
      { _id: new ObjectId(uid as string) },
      { $set: req.body },
    );
    console.log(returnData);

    res.json({ data: uid });
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});
