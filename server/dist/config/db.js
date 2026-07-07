"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.connectToDatabase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'jobtracker';
let client = null;
let database = null;
const connectToDatabase = async () => {
    if (database && client) {
        return database;
    }
    client = new mongodb_1.MongoClient(uri);
    await client.connect();
    database = client.db(dbName);
    return database;
};
exports.connectToDatabase = connectToDatabase;
const getCollection = async (collectionName) => {
    const db = await (0, exports.connectToDatabase)();
    return db.collection(collectionName);
};
exports.getCollection = getCollection;
