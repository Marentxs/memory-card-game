function CharacterCard({ character }) {
  return (
    <li className="character-card">
      <img src={character.imageUrl} alt={character.name} />
      <p>{character.name}</p>
    </li>
  );
}

export default CharacterCard;
