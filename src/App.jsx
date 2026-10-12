// src/App.jsx
import { useEffect, useState } from "react";
import { getSopranosCharacters } from "./api.jsx";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSopranosCharacters()
      .then(setCharacters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul className="characters-grid">
      {characters.map((c) => (
        <li key={c.name} className="character-card">
          <img src={c.imageUrl} alt={c.name} />
          <p>{c.name}</p>
        </li>
      ))}
    </ul>
  );
}
