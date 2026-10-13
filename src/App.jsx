import { useEffect, useState } from "react";
import { getSopranosCharacters } from "./api.jsx";
import CharacterCard from "./components/Card.jsx";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ids, setIds] = useState(new Set());

  function receiverIds(id) {
    console.log("the following id was clicked " + id);
    if (ids.has(id)) {
      const next = new Set();
      setIds(next);
    } else {
      setIds((prev) => new Set(prev).add(id));
    }
  }

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
        <CharacterCard key={c.id} character={c} onSelect={receiverIds} />
      ))}
    </ul>
  );
}
