import { MongoClient } from 'mongodb';
import { configs } from '../config.service'

const MONGO_URL = configs.mongoUrl

export const getDb = async () => {
  console.log("the url is: ", MONGO_URL)
  const client: any = await MongoClient.connect(MONGO_URL, { useUnifiedTopology: true });
  return client.db();
};
