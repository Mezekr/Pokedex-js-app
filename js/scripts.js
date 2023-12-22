//array to hold Pokémon data

const pokemonList = [
	{ name: "Bulbasaur", height: 0.7, type: ["grass", "poison"], weight: 6.9 }, //#1
	{ name: "Charmander", height: 0.6, type: ["fire"], weight: 8.5 }, //#4
	{ name: "Squirtle", height: 0.5, type: ["water"], weight: 9 }, //#7
	{ name: "Caterpie", height: 0.3, type: ["bug"], weight: 2.9 }, //#10
	{ name: "Beedrill", height: 1, type: ["bug", "poison"], weight: 25.5 }, //#15
	{ name: "Pidgeotto", height: 1.1, type: ["flying", "normal"], weight: 30 }, //#17
	{ name: "Kadabra", height: 1.3, type: ["psychic"], weight: 56.5 }, // #64
];

text = "<ul>";
pokemonList.forEach(function (pokemon) {
	if (pokemon.height > 1) {
		text += `<li> ${pokemon.name} ( height ) ${pokemon.height} Wow!! that's big </li>`;
	} else {
		text += `<li> ${pokemon.name} ( height ) ${pokemon.height} </li>`;
	}
});

text += "</ul>";

document.getElementById("pokemon-list").innerHTML = text;

//document.write(`Here there are ${pokemonList.length} Pokémon`);
