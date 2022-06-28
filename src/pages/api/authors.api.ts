import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import database from '@/middlewares/database';
import { ExtendedRequest } from '@/middlewares/database/model';
import { AuthorSchema } from '@/models/author';

const COLLECTION = 'authors';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler.use(database);

handler
  .post(async (req, res) => {
    const collection = req.db.collection<AuthorSchema>(COLLECTION);

    const doc = JSON.parse(JSON.stringify(req.body));

    try {
      const { insertedId } = await collection.insertOne(doc);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end({ data: { _id: insertedId.toString() } });
    } catch (error) {
      res.end(error);
    }
  })
  .get(async (req, res) => {
    const collection = req.db.collection<AuthorSchema>(COLLECTION);

    const findResult = await collection.find({}).toArray();

    res.json({ data: findResult });
  });

export default handler;
