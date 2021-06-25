// track element
const pokedeskContainer = document.getElementById('pokedesk-container');
const totalPokemon = 150;
const colors = {
    fire : '#fddfd',
    narmal : '#f5f5f5',
    fighting : '#e6e0d4',
    flying : '#f5f5f5',
    psychic : '#eaeda1',
    dragon : '#97b3e6',
    bug : '#f8d5a3',
    poison : '#98d7a5',
    fairy : '#fceaff',
    rock : '#d5d5d4',
    ground : '#fceaff',
    water : '#d5d5d4',
    electric : '#fcf7de',
    grass : '#defde0'
}

const mainType = Object.keys(colors);

// fetchPokemon function
async function fetchPokemon(){
    for(let i = 1; i <= totalPokemon; i++){
         await  getPokemon(i)
    }
}

async function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const result = await fetch(url);
    const data = await result.json();
    createPokemonCard(data);
}

// createPokemonCard functoin
function createPokemonCard(data){
    // extrack data object
    let {
        id,
        name,
        types
    } = data;

    // reaname the object property
    let pokemonName = name[0].toUpperCase() + name.slice(1);
    let pokemonId = id.toString().padStart(3,'0');
    let pokemonType = types.map(type=> type.type.name);
    let type = mainType.find(type => pokemonType.indexOf(type) > -1);
    let color = colors[type];

    // create pokemonCard and add class
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon')

    // change pokemonCard background
    pokemonCard.style.backgroundColor = color;

    // set innerHTML in pokemonCard
    pokemonCard.innerHTML = `
        <!-- start div-img -->
        <div class="div-img">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="${pokemonName}">
        </div>
        <!-- end div-img -->

        <!-- start info -->
        <div class="info">
            <span class="number">#${pokemonId}</span>
            <h3 class="name">${pokemonName}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    <!-- end info -->
    `

    // appendChild inside pokedeskContainer
    pokedeskContainer.appendChild(pokemonCard);
}

// fetch pokemon by calling function
fetchPokemon();