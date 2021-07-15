import { MongoClient } from "mongodb";
const URI =
  "mongodb+srv://admin-frank:DHvkij21glMIwbIp@test-cluster.hldmv.mongodb.net/meetups?retryWrites=true&w=majority";

const client = new MongoClient(URI);

export const openConnection = async (collection) => {
  await client.connect();
  const db = client.db();
  return db.collection(collection);
};

export const closeConnection = () => {
  client.close();
};
