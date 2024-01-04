import { MongoClient, Collection, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import { TMovie } from "../shared/types";

const uri =
  "mongodb+srv://Cluster0:ejC96VqFnaxBHZoZ@cluster0.inltwg6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let moviesCollection: Collection<TMovie>;

(async () => {
  await client.connect();
  const database = client.db("sample_mflix");
  moviesCollection = database.collection("movies");
})();

const app = express();
app.use(bodyParser.json());

// Create
app.post("/movies", async (req, res) => {
  const movie: TMovie = req.body;
  const result = await moviesCollection.insertOne(movie);
  res.status(201).send(result.insertedId);
});

// Read
app.get("/movies", async (_req, res) => {
  const movies = await moviesCollection.find().toArray();
  res.send(movies);
});

// Update
app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const movie: TMovie = req.body;
  await moviesCollection.updateOne({ _id: new ObjectId(id) }, { $set: movie });
  res.sendStatus(200);
});

// Delete
app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  await moviesCollection.deleteOne({ _id: new ObjectId(id) });
  res.sendStatus(200);
});

// Start the server
app.listen(5000, () => console.log("Server is running on port 5000"));
