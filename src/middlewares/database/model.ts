import { Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';

export interface ExtendedRequest extends NextApiRequest {
  dbClient: MongoClient;
  db: Db;
}
