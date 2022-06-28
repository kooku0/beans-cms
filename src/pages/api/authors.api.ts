import { Collection } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import database from '@/middleware/database';
import { AuthorSchema } from '@/models/author';

const COLLECTION = 'authors';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(database);

handler
  .post(async (req: any, res) => {
    const collection = req.db.collection(COLLECTION) as Collection<AuthorSchema>;

    const doc = JSON.parse(JSON.stringify(req.body));

    try {
      const { insertedId } = await collection.insertOne(doc);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end({ data: { _id: insertedId.toString() } });
    } catch (error) {
      res.end(error);
    }
  })
  .get(async (req: any, res) => {
    const collection = req.db.collection(COLLECTION) as Collection<AuthorSchema>;

    const findResult = await collection.find({}).toArray();

    res.json({ data: findResult });
  });

export default handler;
