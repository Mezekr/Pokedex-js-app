// IIFE: array to hold Pokémon data

let pokemonRepository = (function () {
	const pokemonList = [
		{
			name: "Bulbasaur",
			height: 0.7,
			type: ["grass", "poison"],
			weight: 6.9,
		}, //#1
		{ name: "Charmander", height: 0.6, type: ["fire"], weight: 8.5 }, //#4
		{ name: "Squirtle", height: 0.5, type: ["water"], weight: 9 }, //#7
		{ name: "Caterpie", height: 0.3, type: ["bug"], weight: 2.9 }, //#10
		{ name: "Beedrill", height: 1, type: ["bug", "poison"], weight: 25.5 }, //#15
		{
			name: "Pidgeotto",
			height: 1.1,
			type: ["flying", "normal"],
			weight: 30,
		}, //#17
		{ name: "Kadabra", height: 1.3, type: ["psychic"], weight: 56.5 }, // #64
	];

	function add(pokemon) {
		if (typeof pokemon !== "object") {
			console.log(
				"pokemon is not an object, that is a",
				typeof pokemon,
				"."
			);
		} else if (!Object.keys(pokemon).length) {
			console.log(
				"Pokemon is an object but is empty i.e has neither properties nor methods attached to it"
			);
		} else {
			pokemonList.push(pokemon);
		}
	}
	function getAll() {
		return pokemonList;
	}

	// Display a list of Pokemons in the index page as buttons
	function addListItem(pokemon) {
		let pokemonList = document.querySelector(".pokemon-list");
		let pokemomlistItem = document.createElement("li");
		let button = document.createElement("button");
		button.innerText = pokemon.name;
		button.classList.add("button-class");
		pokemomlistItem.appendChild(button);
		pokemonList.appendChild(pokemomlistItem);
		clickListener(button, pokemon);
	}

	function clickListener(selector, pokemonObj) {
		selector.addEventListener("click", showDetails(pokemonObj));
	}

	function showDetails(pokemon) {
		console.log(pokemon);
		let pokemonCard = document.querySelector("#pokemon-view-card");
		pokemonCard.innerText = pokemon.name;
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
	};
})();

// test: add pokemon object
pokemonRepository.add({
	name: "Pinsir",
	height: 1.5,
	type: ["bug"],
	weight: 55,
});
// test: do not add a Pokémon object instead of just a string
pokemonRepository.add("Pinsir");

// Display a list of Pokemons in the index page
pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon);
});

// test: add empty pokemon object
pokemonRepository.add({});

// check Pokemon by name
function findByName(name) {
	function check(pokemon) {
		if (pokemon.name === name) {
			return pokemon.name;
		}
	}
	let foundPokemon = pokemonRepository.getAll().filter(check);
	if (foundPokemon.length !== 0)
		return pokemonRepository.getAll().filter(check);
	return `Pokemon with Name ${name} not found.`;
}

// test: Find a Pokémon by its name, the name is available
console.log(findByName("Charmander"));

// test: Find a Pokémon by its name, the name is not available
console.log(findByName("Charmandder"));
