import dotenv from 'dotenv';
import { Db, Document, MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGODB_URI ;
const dbName = process.env.DB_NAME ;

let client: MongoClient | null = null;
let database: Db | null = null;

export const connectToDatabase = async () => {
  if (database && client) {
    return database;
  }

  client = new MongoClient(uri??"mongodb+srv://rahulbikker_db_user:Rahul2064@cluster0.qlwcvq5.mongodb.net/");
  await client.connect();
  console.log("Database connected");
  database = client.db(dbName);
  return database;
};

export const getCollection = async <T extends Document = Document>(collectionName: string) => {
  const db = await connectToDatabase();
  return db.collection<T>(collectionName);
};
