import { MongoClient } from "mongodb";

async function handler(req, res) {
  const uri =
    "mongodb+srv://admin-frank:DHvkij21glMIwbIp@test-cluster.hldmv.mongodb.net/meetups?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db();

  if (req.method === "POST") {
    const data = req.body;
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({
      method: "POST",
      data,
      message: "Successfully inserted new meetup into database.",
    });
  }
}

export default handler;
