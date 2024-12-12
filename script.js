const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const select = document.getElementById('seleccionar-Pokemon');
const ContenedorTarjeta = document.getElementById('pokemon-tarjeta');

const typeColors = {
    fire: '#fddfdf',
    water: '#def3fd',
    grass: '#defde0',
    electric: '#fcf7de',
    psychic: '#eaeda1',
    ice: '#e0f5ff',
    dragon: '#97b3e6',
    dark: '#a9a9a9',
    fairy: '#fceaff',
    normal: '#f5f5f5',
    fighting: '#e6e0d4',
    flying: '#f5f5f5',
    poison: '#e0d4e6',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    bug: '#f8d5a3',
    ghost: '#735797',
    steel: '#f4f4f4'
};

// Cargar la lista de Pokémon
async function CargarListaPokemon() {
    const response = await fetch(`${apiUrl}?limit=1000`);
    const data = await response.json();
    select.innerHTML = '<option value="">Selecciona un Pokémon</option>';
    data.results.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon.url;
        option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        select.appendChild(option);
    });
}

// Mostrar tarjeta del Pokémon seleccionado
async function MostrarTarjetaPokemon(url) {
    if (!url) {
        ContenedorTarjeta.innerHTML = '';
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        return;
    }

    const response = await fetch(url);
    const data = await response.json();

    const abilities = data.abilities.map(ability => 
        ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)
    ).join(', ');

    const primaryType = data.types[0]?.type?.name;
    const bgColor = typeColors[primaryType] || '#fff';

    document.body.style.backgroundColor = bgColor;
    document.body.style.color = primaryType === 'dark' ? '#fff' : '#000';

    ContenedorTarjeta.innerHTML = `
        <div class="tarjeta">
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <p><strong>Habilidades:</strong></p>
            <ul>
                ${data.abilities.map(ability => `<li>${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Eventos
select.addEventListener('change', (e) => {
    MostrarTarjetaPokemon(e.target.value);
});

// Inicializar
CargarListaPokemon();
