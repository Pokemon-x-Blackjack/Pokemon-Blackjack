const CharacterCard = ({ userPokemon, rosterArr, cardOrder, handleClickSelect, handleFocusSelect }) => {
    return (
        <div
            tabIndex={0}
            className={userPokemon === rosterArr[cardOrder].name ? 'pokemonCard activeCard' : 'pokemonCard'}
            onClick={handleClickSelect}
            onFocus={handleFocusSelect}>

            <img
                src={`${rosterArr[cardOrder].frontGifUrl}`}
                alt={`${rosterArr[cardOrder].altFront}`}
            />

            <h3>{rosterArr[cardOrder].name}</h3>
        </div>
    )
}

export default CharacterCard;

