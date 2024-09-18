

//current
var  APokemonId = 1;
document.getElementById('pokemonInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchPokemon();
    }
});

function fetchPokemon(pokemonId = null) {

    const pokemonInput = pokemonId || document.getElementById('pokemonInput').value.toLowerCase();
    const pokemonDataDiv = document.getElementById('pokemonData');

    if (pokemonInput === "") {
        pokemonDataDiv.innerHTML = "<p>Por favor, insira um nome ou ID de Pokémon.</p>";
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            currentPokemonId = data.id;
            const pokemonHTML = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)} (#${data.id})</h2>
                
                <img src="${data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}" alt="${data.name}">
                <p><strong>Altura:</strong> ${data.height / 20} metros</p>
                <p><strong>Peso:</strong> ${data.weight / 20} kg</p>
                <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
            `;
            pokemonDataDiv.innerHTML = pokemonHTML;
            changeDivColor(data.types.map(type => type.type.name));
        })

        .catch(error => {
            pokemonDataDiv.innerHTML = `<p>${error.message}</p>`;
        });
}
function changeDivColor(types) {
    const pokemonDataDiv = document.getElementById('pokemonData');
    pokemonDataDiv.classList.remove('fire', 'water', 'grass', 'electric', 'default','bug','ground','psychic','ghost','ice','dragon','rock','dark');
    
    if (types.includes('fire')) {
        pokemonDataDiv.classList.add('fire');
    } else if (types.includes('water')) {
        pokemonDataDiv.classList.add('water');
    } else if (types.includes('grass')) {
        pokemonDataDiv.classList.add('grass');
    } else if (types.includes('electric')) {
        pokemonDataDiv.classList.add('electric');
    } else if (types.includes('defaut')){
        pokemonDataDiv.classList.add('default');
    } else if (types.includes('bug')){
        pokemonDataDiv.classList.add('bug');
    } else if (types.includes('ground')){
        pokemonDataDiv.classList.add('ground');
    } else if (types.includes('psychic')){
        pokemonDataDiv.classList.add('psychic');
    } else if (types.includes('ghost')){
        pokemonDataDiv.classList.add('ghost');
    } else if (types.includes('ice')){
        pokemonDataDiv.classList.add('ice');
    } else if (types.includes('dragon')){
        pokemonDataDiv.classList.add('dragon');
    } else if(types.includes('rock')){
        pokemonDataDiv.classList.add('rock');
    } else if(types.includes('dark')){
        pokemonDataDiv.classList.add('dark')
    }
}


function nextPokemon() {
    currentPokemonId += 1;
    fetchPokemon(currentPokemonId);
}

function previousPokemon() {
    if (currentPokemonId > 1) {
        currentPokemonId -= 1; // currentPokemonId = currentPokemonId - 1
        fetchPokemon(currentPokemonId);
    }
}