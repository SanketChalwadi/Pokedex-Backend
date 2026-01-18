import express from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemon.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pokemon", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Pokédex API running");
});

export default app;
