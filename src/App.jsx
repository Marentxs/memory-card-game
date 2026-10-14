import { useEffect, useState } from "react";
import { getSopranosCharacters } from "./api.jsx";
import CharacterCard from "./components/Card.jsx";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ids, setIds] = useState(new Set());
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    getSopranosCharacters()
      .then(setCharacters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  let score = ids.size;
  let prospectiveScore = score + 1;

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function receiverIds(id) {
    const copy = [...characters];
    if (ids.has(id)) {
      const next = new Set();
      setIds(next);
    } else {
      setIds((prev) => new Set(prev).add(id));
      if (prospectiveScore > bestScore) {
        setBestScore(prospectiveScore);
      }
    }
    setCharacters(shuffleArray(copy));
  }

  return (
    <>
      <p>
        Score : {score} - Best Score : {bestScore}
      </p>
      <ul className="characters-grid">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} onSelect={receiverIds} />
        ))}
      </ul>
      <p>{ids.size === 12 && <span> You won this round!</span>}</p>
    </>
  );
}
