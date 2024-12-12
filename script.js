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
    const response = await fetch(`${apiUrl}?limit=1302`);
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
    actualizarEstiloFondo(primaryType); // Actualiza el fondo según el modo y tipo

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

// Actualizar el fondo según el modo y el tipo de Pokémon
function actualizarEstiloFondo(type) {
    const darkMode = document.body.classList.contains('modo-oscuro');
    const bgColor = actualizarColorTipos(type);
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = darkMode ? '#fff' : '#000';
}

// Eventos
select.addEventListener('change', (e) => {
    MostrarTarjetaPokemon(e.target.value);
});

// Inicializar
CargarListaPokemon();

// Referencia al botón de modo oscuro
const BotonModoOscuro = document.getElementById('cambiar-modo-oscuro');

// Alternar el modo oscuro
BotonModoOscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');

    // Cambiar texto del botón
    BotonModoOscuro.textContent = 
        document.body.classList.contains('modo-oscuro') ? 'Modo Claro' : 'Modo Oscuro';

    // Actualizar el fondo si ya hay un Pokémon seleccionado
    const urlSeleccionada = select.value;
    if (urlSeleccionada) {
        MostrarTarjetaPokemon(urlSeleccionada);
    }
});

// Actualiza los colores del tipo según el modo
function actualizarColorTipos(type) {
    const darkMode = document.body.classList.contains('modo-oscuro');
    const typeColorsDark = {
        fire: '#a84040',
        water: '#2b78c8',
        grass: '#3d8050',
        electric: '#a79420',
        psychic: '#8a8a40',
        ice: '#60a0b0',
        dragon: '#4b5a80',
        dark: '#404040',
        fairy: '#a05080',
        normal: '#808080',
        fighting: '#9e4200',
        flying: '#303138',
        poison: '#2b0040',
        ground: '#603000',
        rock: '#343434',
        bug: '#3b5b00',
        ghost: '#22004e',
        steel: '#5f5f5f'
    };

    return darkMode ? typeColorsDark[type] || '#444' : typeColors[type] || '#fff';
}
