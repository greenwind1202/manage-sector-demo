import { Schema,connect, connection } from 'mongoose';

const connectionString = 'mongodb://root:pass@mongo:27017';

connect(connectionString).catch((e) => {
  console.error('Connection error', e.message);
});
const db = connection;

export default db;
