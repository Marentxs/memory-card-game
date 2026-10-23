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
      <header className="title-block">
        <h1 className="game-title">The Sopranos</h1>
        <p className="game-subtitle">Card Game</p>
        <p className="game-instructions">
          Click all 14 characters without clicking the same one twice!
        </p>
        <p>
          {ids.size === 14 && (
            <div className="win-message win-sopranos">
              <span className="made-icon">♠</span>
              <h2>You're Made.</h2>
              <div className="win-divider" />
              <p>
                14 characters. No mistakes.
                <br />
                You're part of the family.
              </p>
            </div>
          )}
        </p>
      </header>

      <div className="scoreboard">
        <div className="score-item">
          <span className="score-label">Score </span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-divider" />
        <div className="score-item">
          <span className="score-label">Best </span>
          <span className="score-value">{bestScore}</span>
        </div>
      </div>

      <ul className="characters-grid">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} onSelect={receiverIds} />
        ))}
      </ul>

      <div id="footer">
        <a
          href="https://www.theodinproject.com/lessons/node-path-react-new-memory-card"
          target="_blank"
          rel="noreferrer"
        >
          <span>The Odin Project</span>
        </a>
        <span> - </span>
        <a href="https://github.com/Marentxs" target="_blank" rel="noreferrer">
          <span>My github</span>
        </a>
      </div>
    </>
  );
}
