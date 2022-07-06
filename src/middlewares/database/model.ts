import { Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';

export interface NextApiRequestWithDb extends NextApiRequest {
  dbClient: MongoClient;
  db: Db;
}
