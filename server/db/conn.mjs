import { MongoClient } from "mongodb";

//const connectionString = process.env.ATLAS_URI ;

const client = new MongoClient('mongodb+srv://bidding:bidding@bidding.x5qagab.mongodb.net/?retryWrites=true&w=majority');

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("user");

export default { db};

