import express from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemon.js";

const app = express();

// 🔒 CORS Configuration
app.use(cors({
  origin: "https://pokedex-frontend-wheat.vercel.app",   // ❌ no trailing slash
  methods: ["GET"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/pokemon", pokemonRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Pokédex API running");
});

export default app;
