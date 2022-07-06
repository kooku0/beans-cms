/* eslint-disable no-underscore-dangle */
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import database from '@/middlewares/database';
import { NextApiRequestWithDb } from '@/middlewares/database/model';
import { AuthorSchema } from '@/models/author';

const COLLECTION = 'authors';

const handler = nextConnect<NextApiRequestWithDb, NextApiResponse>();

handler.use(database);

handler
  .post(async (req, res) => {
    const collection = req.db.collection<AuthorSchema>(COLLECTION);

    const doc = JSON.parse(JSON.stringify(req.body));

    try {
      const { insertedId } = await collection.insertOne(doc);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end({ data: { uid: insertedId.toString() } });
    } catch (error) {
      res.end(error);
    }
  })
  .get(async (req, res) => {
    const collection = req.db.collection<AuthorSchema>(COLLECTION);

    const findResult = await collection.find({}).toArray();
    const data = findResult.map((item) => ({ ...item, uid: item._id.toString() }));

    res.json({ data });
  });

export default handler;
