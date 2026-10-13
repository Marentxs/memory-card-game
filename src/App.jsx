import { useEffect, useState } from "react";
import { getSopranosCharacters } from "./api.jsx";
import CharacterCard from "./components/Card.jsx";
import "./App.css";

function receiverIds(id) {
  console.log("the following id was clicked " + id);
}

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
        <CharacterCard key={c.id} character={c} onSelect={receiverIds} />
      ))}
    </ul>
  );
}
