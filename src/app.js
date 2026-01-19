import express from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemon.js";

const app = express();

// ✅ Allow your Vercel frontend
app.use(cors({
  origin: "https://pokedex-frontend-git-main-sanketschalwadi-7970s-projects.vercel.app/",
  methods: ["GET"],
  credentials: true
}));

app.use(express.json());

app.use("/api/pokemon", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Pokédex API running");
});

export default app;
