function CharacterCard({ character, onSelect }) {
  return (
    <li className="character-card" onClick={() => onSelect(character.id)}>
      <img src={character.imageUrl} alt={character.name} />
      <p>{character.name}</p>
    </li>
  );
}

export default CharacterCard;
