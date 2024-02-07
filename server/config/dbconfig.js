const { MongoClient } = require("mongodb");
const mongodb_url = "mongodb://localhost:27017";

const state = {
  db: null,
};

module.exports.connect = async () => {
  if (state.db) return done;
  const dbName = "expenseTracker";
  const client = new MongoClient(mongodb_url);
  try {
    await client.connect();
    const dbs = client.db(dbName);
    state.db = dbs;

    await client.db(dbName).command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
};

module.exports.get = () => {
  return state.db;
};
