const { MongoClient } = require("mongodb");

const uri ="mongodb+srv://mukund7521:mukund2988@cluster0.fvc1m7s.mongodb.net/";

const client = new MongoClient(uri);

const database = client.db("temp");
const coll = database.collection("data"); 

async function run() {
  try {
    await client.connect();
  } finally {
    console.log('Done');
  }
}

run().catch(console.dir);

module.exports = 
  {coll,};