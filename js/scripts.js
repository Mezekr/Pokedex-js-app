// IIFE: array to hold Pokémon data

let pokemonRepository = (function () {
	const pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add(pokemon) {
		if (typeof pokemon !== 'object') {
			console.log(
				'pokemon is not an object, that is a',
				typeof pokemon,
				'.'
			);
		} else if (!Object.keys(pokemon).length) {
			console.log(
				'Pokemon is an object but is empty i.e has neither properties nor methods attached to it'
			);
		} else {
			pokemonList.push(pokemon);
		}
	}

	// Loads data from the pokeapi
	function loadList() {
		let apiData = fetch(apiUrl)
			.then(function (resonse) {
				return resonse.json();
			})
			.then(function (resonseJson) {
				resonseJson.results.forEach((item) => {
					let pokemon = {
						name: item.name,
						datailUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function (err) {
				console.error(err);
			});
		return apiData;
	}

	function loadDetails(item) {
		let pokemonData = fetch(item.datailUrl)
			.then((reponse) => {
				return reponse.json();
			})
			.then((itemsJson) => {
				item.name = itemsJson.name;
				item.imgUrl = itemsJson.sprites.front_default;
				item.height = itemsJson.height;
				item.weight = itemsJson.weight;
				item.types = itemsJson.types;
			});
		return pokemonData;
	}
	function getAll() {
		return pokemonList;
	}

	// Display a list of Pokemons in the index page as buttons
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let pokemomlistItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class');
		pokemomlistItem.appendChild(button);
		pokemonList.appendChild(pokemomlistItem);
		clickListener(button, pokemon);
	}

	function clickListener(selector, pokemonObj) {
		selector.addEventListener('click', function () {
			showDetails(pokemonObj);
		});
	}

	function showDetails(pokemon) {
		let modalContainer = document.querySelector('#modal-container');
		modalContainer.innerHTML = '';

		// Modal elements
		let modal = document.createElement('div');
		let closeButton = document.createElement('button');
		closeButton.innerText = 'Close';
		closeButton.classList.add('modal-close');

		// Modal elements to display pokemon datails
		let pokemonDetail = document.createElement('div');
		let pokemonImg = document.createElement('img');
		let pokemonName = document.createElement('h2');
		let pokemonTypes = document.createElement('div');
		let pokemonStatsDiv = document.createElement('div');

		// pokemon height elements container and elements
		let pokemomHeightDiv = document.createElement('div');
		let pokemomHeightH3 = document.createElement('h3');
		let pokemomHeightP = document.createElement('p');
		pokemomHeightDiv.appendChild(pokemomHeightP);
		pokemomHeightDiv.appendChild(pokemomHeightH3);

		// pokemon Weight elements container and elements
		let pokemomWeightDiv = document.createElement('div');
		let pokemomWeighH3 = document.createElement('h3');
		let pokemomWeightP = document.createElement('p');
		pokemomWeightDiv.appendChild(pokemomWeightP);
		pokemomWeightDiv.appendChild(pokemomWeighH3);

		// append height and weight elements container to status container
		pokemonStatsDiv.appendChild(pokemomHeightDiv);
		pokemonStatsDiv.appendChild(pokemomWeightDiv);

		pokemonTypes.classList.add('pokemon-types');

		// Display the pokemon datails
		loadDetails(pokemon).then(() => {
			pokemonImg.src = pokemon.imgUrl;
			pokemonName.innerText = pokemon.name;
			appendTypes(pokemonTypes, pokemon.types);
			pokemomHeightH3.innerText = 'Height';
			pokemomHeightP.innerText = pokemon.height;
			pokemomWeighH3.innerText = 'Weght';
			pokemomWeightP.innerText = pokemon.weight;
		});
		// add all elements to datail's container (div) of modal
		pokemonDetail.append(pokemonImg);
		pokemonDetail.append(pokemonName);
		pokemonDetail.appendChild(pokemonTypes);
		pokemonDetail.append(pokemonStatsDiv);

		// add css class to elments
		pokemonName.classList.add('pokemon-name');
		pokemomHeightP.classList.add('pokemon-stats');
		pokemomWeightP.classList.add('pokemon-stats');
		modal.classList.add('modal-wrapper');
		pokemonStatsDiv.classList.add('pokemon-stats');
		pokemonDetail.classList.add('modal');

		// append elements to modal
		modal.appendChild(closeButton);
		modal.appendChild(pokemonDetail);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');

		// Close the modal by clicking the close button
		closeButton.addEventListener('click', hideModal);
	}

	let appendTypes = (containerElement, pokomonTypes) => {
		pokomonTypes.forEach((item) => {
			console.log(item.type.name);
			let typeSpan = document.createElement('span');
			typeSpan.textContent = item.type.name;
			containerElement.appendChild(typeSpan);
		});
	};

	// Close the modal by clicking on the area outside the modal
	let modalContainer = document.querySelector('#modal-container');
	modalContainer.addEventListener('click', (e) => {
		if (e.target === modalContainer) {
			hideModal();
		}
	});

	function hideModal() {
		let modalContainer = document.querySelector('#modal-container');
		modalContainer.classList.remove('is-visible');
	}

	// Close the modal by pressing the Esc key
	window.addEventListener('keydown', (e) => {
		let modalContainer = document.querySelector('#modal-container');
		if (
			e.key === 'Escape' &&
			modalContainer.classList.contains('is-visible')
		) {
			hideModal();
		}
	});

	let searchInputElement = document.querySelector('#searchInput');
	searchInputElement.addEventListener('keyup', () => {
		searchPokemon(searchInputElement.value);
	});

	function searchPokemon(pokemonName) {
		filter = pokemonName.toUpperCase();
		console.log('pokemonName' + filter);
		let ul = document.querySelector('.pokemon-list');
		console.log('Ul' + ul);
		let li = ul.getElementsByTagName('li');
		console.log('li' + li.length);

		// Loop through all list items, and hide those who don't match
		// the search query
		for (let i = 0; i < li.length; i++) {
			btn = li[i].getElementsByTagName('button')[0];
			console.log('btn ->' + btn);
			txtValue = btn.innerText;
			console.log('txtValue ->' + txtValue);

			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = '';
			} else {
				li[i].style.display = 'none';
			}
		}
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
	};
})();

pokemonRepository.loadList().then(() => {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
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
