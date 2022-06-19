import { MongoClient } from 'mongodb';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const DB_URI = process.env.MONGODB_URI;
const DB = process.env.MONGODB_DB;

if (!DB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(DB_URI);

async function database(req: any, res: NextApiResponse, next: any) {
  if (!client.listenerCount) {
    await client.connect();
  }

  req.dbClient = client;
  req.db = client.db(DB);

  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
