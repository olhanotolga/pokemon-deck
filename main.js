const pokemonContainer = document.querySelector('.pokemon-container');
const formElem = document.querySelector('form');
const inputElem = document.querySelector('#pokemon-name');

formElem.addEventListener('submit', e => {
	e.preventDefault();
	pokemonContainer.innerHTML = '';
	getPokemon(inputElem.value);
})

const getPokemon = async (name = 'ditto') => {
	const pokemonElem = document.createElement('div');
	pokemonElem.classList.add('pokemon');

	name = name.toLowerCase();

	if (name === '') {
		pokemonElem.innerHTML = 'Uh oh, enter a pokemon\'s name!';

	} else {

		try {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const pokemon = await res.json();
			console.log(pokemon);
			pokemonElem.innerHTML = `
				<div class='info'>
					<img src='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png' width='200'>
					<h2>${pokemon.name}</h2>
				</div>
		
				<div class='stats'>
					<h3>Stats</h3>
					<ul>
					${pokemon.stats.map(stat => `<li class='stat'><span>${stat.stat.name}</span><span>${stat.base_stat}</span></li>`).join('')}
					</ul>
				</div>
		
				<div class='abilities'>
					<h3>Abilities</h3>
					<ul>
					${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
					</ul>
				</div>
			`;
		} catch(error) {
			console.log(error);
			pokemonElem.innerHTML = 'Uh oh, something\'s wrong!\nMake sure you\'ve entered a valid pokemon name.';
		}
	
	}

	pokemonContainer.appendChild(pokemonElem);
}

getPokemon();

// zubat, ditto, mew, charizard
// eevee, rattata, tangela, butterfree, squirtle
// wartortle, charmander, vaporeon, vulpix, gengar
