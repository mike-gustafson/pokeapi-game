async function fetchMoveInformation(move) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
        const data = await response.json();
        
        const flavorText = (flavorTextArray) => {
            for (let i = 0; i < flavorTextArray.length; i++) {
                if (flavorTextArray[i].language.name === 'en') {
                    return flavorTextArray[i].flavor_text;
                }
            }
        };

        const newPokemonMove = new PokemonMove(
            data.name,
            data.accuracy,
            data.damage_class.name,
            data.effect_chance,
            data.power,
            data.pp,
            flavorText(data.flavor_text_entries),
            data.crit_rate,
            data.healing,
        );
        return newPokemonMove;

    } catch (error) {
        console.log('Error fetching data', error);
        throw error;
    }
}
