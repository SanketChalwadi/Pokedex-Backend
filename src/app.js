import express from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemon.js";

const app = express();

// ✅ Allow your Vercel frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET"],
  credentials: true
}));

app.use(express.json());

app.use("/api", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Pokédex API running");
});

export default app;
