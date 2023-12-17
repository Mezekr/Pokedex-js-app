//array to hold Pokémon data

const pokemanList = [
	{ name: "Bulbasaur", height: 7, type: ["grass", "poison"], weight: 6.9 }, //#1
	{ name: "Charmander", height: 6, type: ["fire"], weight: 8.5 }, //#4
	{ name: "Squirtle", height: 5, type: ["water"], weight: 9 }, //#7
	{ name: "Caterpie", height: 3, type: ["bug"], weight: 2.9 }, //#10
	{ name: "Beedrill", height: 1, type: ["bug", "poison"], weight: 25.5 }, //#15
	{ name: "Pidgeotto", height: 1, type: ["flying", "normal"], weight: 30 }, //#17
	{ name: "Kadabra", height: 1, type: ["psychic"], weight: 56.5 }, // #64
];

text = "<ul>";

for (let i = 0; i < pokemanList.length; i++) {
	if (pokemanList[i].height > 6) {
		text +=
			"<li>" +
			pokemanList[i].name +
			" ( " +
			"height" +
			pokemanList[i].height +
			" ) " +
			" Wow, that’s big " +
			"</li>";
	}
	text +=
		"<li>" +
		pokemanList[i].name +
		" ( " +
		"height" +
		pokemanList[i].height +
		" ) " +
		"</li>";
}

text += "</ul>";

document.getElementById("pokemon-list").innerHTML = text;

//document.write(`Here there are ${pokemanList.length} Pokémon`);
