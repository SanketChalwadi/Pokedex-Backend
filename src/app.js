import express from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemon.js";

const app = express();

// ✅ Allow your Vercel frontend (FIXED)
app.use(cors({
  origin: "https://pokedex-frontend-mu.vercel.app",
  methods: ["GET"],
  credentials: true
}));

app.use(express.json());

app.use("/api/pokemon", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Pokédex API running");
});

export default app;
