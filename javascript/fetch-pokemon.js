async function fetchPokemon(pokemonInput) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
        const data = await response.json();

        let l = Math.floor(Math.random() * data.moves.length);
        let m = Math.floor(Math.random() * data.moves.length);
        if (data.moves.length > 1) {
            while (l === m) {
                m = Math.floor(Math.random() * data.moves.length);
            }
        }
        let n = Math.floor(Math.random() * data.abilities.length);
        let o = Math.floor(Math.random() * data.types.length);

        // Get both moves information from the API
        const move1Details = await fetchMoveInformation(data.moves[l].move.name);
        const move2Details = await fetchMoveInformation(data.moves[m].move.name);

        // Build Stat object from Data
        const statNumbers = {};
        data.stats.forEach(item => {
            statNumbers[item.stat.name] = item.base_stat;
        });
        data.stats = statNumbers;

        // Convert height from decimeters to inches
        const decimetersToInches = (decimeters) => {
            const conversionFactor = 3.93701;
            return decimeters * conversionFactor;
        };

        const height = decimetersToInches(data.height);
        data.height = height.toFixed(0);

        // Convert weight from decagrams to ounces
        const decagramsToOunces = (decagrams) => {
            const conversionFactor = 0.352739;
            return decagrams * conversionFactor;
        };

        const weight = decagramsToOunces(data.weight);
        data.weight = weight.toFixed(0);

        console.log(data)

        // Assemble new Pokémon to return to the main app
        const newPokemon = new Pokemon(
            data.name,
            data.sprites.other["official-artwork"].front_default,
            move1Details,
            move2Details,
            data.abilities[n].ability.name,
            data.height,
            data.weight,
            data.id,
            data.types[o].type.name,
            data.stats
        );

        // Make a Pokémon card and add it
        makePokemonCard(newPokemon);

        // Reset search box to blank
        let inputBox = document.getElementById('pokemon');
        inputBox.value = '';
        
    } catch (error) {
        console.log('Error fetching data', error);
    }
}
