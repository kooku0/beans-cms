import { Collection } from 'mongodb';
import nextConnect from 'next-connect';

import middleware from '@/middleware/database';

const COLLECTION = 'authors';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: any) => {
  const collection = req.db.collection(COLLECTION) as Collection;

  const findResult = await collection.find({}).toArray();

  res.json(findResult);
});

export default handler;
