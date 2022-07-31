import { MongoClient } from 'mongodb';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { NextApiRequestWithDb } from './model';

const DB_URI = process.env.MONGODB_URI;
const DB = process.env.MONGODB_DB;

if (!DB_URI) {
  throw new Error('Please add your Mongo URI to environment variables');
}

const client = new MongoClient(DB_URI);

async function database(req: NextApiRequestWithDb, res: NextApiResponse, next: NextHandler) {
  if (!client.listenerCount) {
    await client.connect();
  }

  req.dbClient = client;
  req.db = client.db(DB);

  return next();
}

export default database;
