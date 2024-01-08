import { MongoClient, Collection, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import { TMovie } from "../shared/types";
import cors from "cors";

const uri =
  "mongodb+srv://Cluster0:ejC96VqFnaxBHZoZ@cluster0.inltwg6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let moviesCollection: Collection<TMovie>;

(async () => {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    moviesCollection = database.collection("movies");
    const movies = await moviesCollection.findOne();
    console.log("Test query result:", movies);
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create
app.post("/movies", async (req, res) => {
  try {
    const movie: TMovie = req.body;
    const result = await moviesCollection.insertOne(movie);
    res.status(201).send(result.insertedId);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Read
/**
 * The skip method is used to skip over the documents that come before the current page,
 * and the limit method is used to limit the number of documents returned to the number
 * of items per page.
 */
app.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const movies = await moviesCollection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
    res.send(movies);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update
app.put("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie: TMovie = req.body;
    await moviesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: movie }
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Delete
app.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await moviesCollection.deleteOne({ _id: new ObjectId(id) });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(80, () => console.log("Server is running on port 80"));
