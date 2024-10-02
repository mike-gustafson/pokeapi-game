/*
Card Assembler will put the different pieces of a card together

It pulls the image url directly from pokeAPI (github hosted files)
*/

function makePokemonCard(pokemon) {

    /* Create card body
    ----------------
    This functions as a container for all card elements, and makes it dragable
    Sets card container id to the pokemons name
    Adds pokemons type to cards class.  This is used to set background color.

    The basic layout for the card is based on a single column of elements that, when stacked, create the card.
    */

    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('draggable', 'true');
    card.setAttribute('ondragstart', 'drag(event)');
    card.classList.add(pokemon.type, `species-${pokemon.name}`);

// #region Layer 01: Evolution information - NOT STARTED
    /*
    mockup:
    ["Stage {#}"] ["Evolves from {previous stage pokemon}] [put {card name} on Stage {#} card"]
    [image of previous stage]

    notes on mockup:
    image of previous stage should be under "Stage #" and should overlap main pokemon image with bottom 3rd and 
    exted left of main image by approx 1/5th width of image.
    Stage# and image should have background that matched border around main image
    */
    //#endregion
    
// #region Layer 02: Card title - READY TO DEPLOY
    /*
    mockup:
    [pokemon name in bold] [HP in red] [type logo]

    notes on mockup:
    hp and type logo should be right justified with right edge lining up with main image borders right side edge
    gap between right side and border of card should be width of border of card
    */ 
    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class', 'card-title-container');
        // Add Pokemon name
        const cardName = document.createElement('span');
        cardName.setAttribute('class', 'card-title');
        cardName.innerHTML = `${pokemon.name.toUpperCase()}`;
        // Add Pokemon HP
        const pokemonHP = document.createElement('span');
        pokemonHP.setAttribute('class', 'card-hp');
        pokemonHP.innerHTML = `${pokemon.stats.hp} HP`;
        // Add Pokemon type logo
        const typeLogo = document.createElement('svg');
        typeLogo.setAttribute('class', `card-type-logo ${pokemon.type}-shadow` );
        typeLogo.setAttribute('style', `background-image: url('/images/icons/${pokemon.type}.svg')`);
    cardTitle.append(cardName, pokemonHP, typeLogo)
    // #endregion
    
// #region Layer 03: Card Image - READY TO DEPLOY
    // Set Pokemon image
    const pokemonImage = document.createElement('div')
    pokemonImage.setAttribute('class', 'card-img-container')
        const image = document.createElement('img');                
        image.setAttribute('class','card-img');
        image.src = pokemon.artwork;    
    pokemonImage.append(image)
    //#endregion

// #region Layer 04: Pokemon informational data - READY TO DEPLOY

    // convert height of pokemon from inches to string of X' X"
    const convertHeightToString = (inches) => {
        if (inches >= 12) {
            if (inches % 12 === 0) {
                return `${inches /12}'`
            } else {
                return `${Math.floor(inches / 12)}' ${inches%12}"`
            }
        } else {
            return `${inches}"`
        }
    }

    // convert weight of pokemon from ounces to string of X lbs.
    const convertWeightToString = (ounces) => {
        if (ounces >= 16) {
            return `${Math.floor(ounces / 16)} lbs.`
        } else {
            return `${ounces} oz.`
        }
    }

    // create element and construct with card data
    const pokemonInfo = document.createElement('div');
    pokemonInfo.setAttribute('class', 'card-pokemon-info');
        const type =  `${pokemon.type.charAt(0).toUpperCase() + pokemon.type.slice(1)}`
        const height = convertHeightToString(pokemon.height)
        const weight = convertWeightToString(pokemon.weight)
        const infoText = `${type} Pokemon. Height: ${height}, Weight: ${weight}`
    pokemonInfo.append(infoText)
    // #endregion

// #region Layer 05:Pokemon Moves - READY TO DEPLOY
    // Creates portion of card beneath image
    const pokemonMoves = document.createElement('div');
    pokemonMoves.setAttribute('class', 'card-moves-container');

    // Format move names to final form
    const formatMoveName = (move) => {
        move = move.replace(/-/g,' ');
        move = move.replace(/\b\w/g, char => char.toUpperCase());
        return move
    }

    pokemon.move1.name = formatMoveName(pokemon.move1.name)
    pokemon.move2.name = formatMoveName(pokemon.move2.name)

    // Function to create formatable spans to hold move information
    const createMoveTextElement = (move) => {
        const moveContainer = document.createElement('div');
        const moveContainerNameTextHealAmount = document.createElement('div');
        const moveName = document.createElement('span');
        const moveText = document.createElement('span');
        const moveHealAmount = document.createElement('span');
        const moveContainerPP = document.createElement('div');
        const movePP = document.createElement('span');

        moveContainer.setAttribute('class', 'card-move-container');
        moveContainerNameTextHealAmount.setAttribute('class', 'card-move-container-NTH');
        moveName.setAttribute('class', 'card-move-name');
        moveText.setAttribute('class', 'card-move-text');
        moveHealAmount.setAttribute('class', 'card-move-heal-amount');
        moveContainerPP.setAttribute('class', 'card-move-pp-container');
        movePP.setAttribute('class', 'card-move-pp');

        moveName.textContent = `${move.name} `;
        moveText.textContent = move.flavor_text;

        // appends text in correct order "name > heal amount (if any) > flavor text"
        moveContainerNameTextHealAmount.appendChild(moveName)
        if (move.healing !== undefined && move.healing !== null) {
            moveHealAmount.textContent = ` Heal ${move.healing}`;
            moveContainerNameTextHealAmount.appendChild(moveHealAmount);
        }
        moveContainerNameTextHealAmount.appendChild(moveText)
        moveContainer.appendChild(moveContainerNameTextHealAmount)

        // appends PP to area if it exists.  doesn't append to main container if no PP cost
        if (move.pp !== undefined && move.pp !== null) {
            movePP.textContent = `${move.pp}`;
            moveContainerPP.appendChild(movePP)
            moveContainer.appendChild(moveContainerPP);
        }
    


        return moveContainer
    }

    // Create and insert the moves into the card
    pokemonMoves.appendChild(createMoveTextElement(pokemon.move1))
    if (pokemon.move1 !== pokemon.move2) {
        pokemonMoves.appendChild(createMoveTextElement(pokemon.move2))
    }
    // #endregion




    // Creates stat box that appears on hover

    const statBox = document.createElement('div');
    statBox.setAttribute('class', 'card-stat-box');

    const statBoxHeader = document.createElement('div')
    statBoxHeader.setAttribute('class', 'card-stat-box-header')
    statBoxHeader.innerHTML = `Pokedex #${pokemon.id}`

    const statBoxLeft = document.createElement('div') 
    const statBoxRight = document.createElement('div')
    statBoxLeft.setAttribute('class', 'card-stat-box-col')
    statBoxRight.setAttribute('class', 'card-stat-box-col')

    const statBoxAttack = document.createElement('span')
    const statBoxDefense = document.createElement('span')
    const statBoxSPAttack = document.createElement('span')
    const statBoxSPDefense = document.createElement('span')

    statBoxAttack.setAttribute('class', 'card-stat-box-stat')
    statBoxDefense.setAttribute('class', 'card-stat-box-stat')
    statBoxSPAttack.setAttribute('class', 'card-stat-box-stat')
    statBoxSPDefense.setAttribute('class', 'card-stat-box-stat')

    
    statBoxAttack.innerHTML = `Attack: ${pokemon.stats.attack}<br>`;
    statBoxDefense.innerHTML = `Defense: ${pokemon.stats.defense}`;
    statBoxSPAttack.innerHTML = `SP-Atk: ${pokemon.stats['special-attack']}<br>`;
    statBoxSPDefense.innerHTML = `SP-Def: ${pokemon.stats['special-defense']}`;

    statBoxLeft.append(statBoxAttack, statBoxDefense);
    statBoxRight.append(statBoxSPAttack, statBoxSPDefense);


    // assemble stat box
    statBox.append(statBoxHeader, statBoxLeft, statBoxRight);


    // Assembles and deploys card element to bench area
    card.append(cardTitle, pokemonImage, pokemonInfo, pokemonMoves, statBox);
    bench.append(card)

    // rotates cards through bench, removing the one on the far left
    currentBenchCardCount = bench.childElementCount;
    while (currentBenchCardCount > maxCards) {
        bench.firstElementChild.classList.add('discarded');
        discardPile.append(bench.firstElementChild);
        currentBenchCardCount = bench.childElementCount;
    }
    // adds card info to cards array
    cards.push({
        element: card,
        pokemon: pokemon,
    });
}