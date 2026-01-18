import express from "express";
import axios from "axios";

const router = express.Router();
const API = "https://pokeapi.co/api/v2";

// 🔹 List Pokémon
router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${API}/pokemon?limit=151`);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch Pokémon list" });
  }
});

// 🔹 Evolution chain
router.get("/evolution/:name", async (req, res) => {
  try {
    const species = await axios.get(
      `${API}/pokemon-species/${req.params.name}`
    );

    const evoUrl = species.data.evolution_chain.url;
    const evoData = await axios.get(evoUrl);

    res.json(evoData.data);
  } catch {
    res.status(500).json({ error: "Evolution data not found" });
  }
});

// 🔹 Pokémon species (description, habitat, generation)
router.get("/species/:name", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${API}/pokemon-species/${req.params.name}`
    );
    res.json(data);
  } catch {
    res.status(500).json({ error: "Species data not found" });
  }
});

// 🔹 Pokémon by Region (Generation)
router.get("/region/:region", async (req, res) => {
  try {
    const regionMap = {
      kanto: 1,
      johto: 2,
      hoenn: 3,
      sinnoh: 4,
      unova: 5,
      kalos: 6,
      alola: 7,
      galar: 8
    };

    const genId = regionMap[req.params.region.toLowerCase()];
    if (!genId) return res.status(400).json({ error: "Invalid region" });

    const genData = await axios.get(`${API}/generation/${genId}`);

    // Convert species → pokemon URLs
    const results = genData.data.pokemon_species.map(s => {
      const id = s.url.split("/").filter(Boolean).pop();
      return {
        name: s.name,
        url: `${API}/pokemon/${id}`
      };
    });

    res.json({ results });
  } catch {
    res.status(500).json({ error: "Region fetch failed" });
  }
});


// 🔹 Pokémon details (MUST BE LAST)
router.get("/:name", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${API}/pokemon/${req.params.name}`
    );
    res.json(data);
  } catch {
    res.status(404).json({ error: "Pokémon not found" });
  }
});

export default router;
