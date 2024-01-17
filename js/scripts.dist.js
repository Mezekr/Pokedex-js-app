let pokemonRepository = (function () {
	let e = [];
	function t(t) {
		'object' != typeof t
			? console.log('pokemon is not an object, that is a', typeof t, '.')
			: Object.keys(t).length
			? e.push(t)
			: console.log(
					'Pokemon is an object but is empty i.e has neither properties nor methods attached to it'
			  );
	}
	function n(e) {
		return fetch(e.datailUrl)
			.then((e) => e.json())
			.then((t) => {
				(e.name = t.name),
					(e.imgUrl = t.sprites.front_default),
					(e.height = t.height),
					(e.weight = t.weight),
					(e.types = t.types);
			});
	}
	function a() {
		return e;
	}
	let o = (e, t) => {
			t.forEach((t) => {
				console.log(t.type.name);
				let n = document.createElement('span');
				(n.textContent = t.type.name), e.appendChild(n);
			});
		},
		i = document.querySelector('#modal-container');
	function l() {
		document
			.querySelector('#modal-container')
			.classList.remove('is-visible');
	}
	i.addEventListener('click', (e) => {
		e.target === i && l();
	}),
		window.addEventListener('keydown', (e) => {
			let t = document.querySelector('#modal-container');
			'Escape' === e.key && t.classList.contains('is-visible') && l();
		});
	let r = document.querySelector('#searchInput');
	r.addEventListener('keyup', () => {
		!(function e(t) {
			(filter = t.toUpperCase()), console.log('pokemonName' + filter);
			let n = document.querySelector('.pokemon-list');
			console.log('Ul' + n);
			let a = n.getElementsByTagName('li');
			console.log('li' + a.length);
			for (let o = 0; o < a.length; o++)
				(btn = a[o].getElementsByTagName('button')[0]),
					console.log('btn ->' + btn),
					(txtValue = btn.innerText),
					console.log('txtValue ->' + txtValue),
					txtValue.toUpperCase().indexOf(filter) > -1
						? (a[o].style.display = '')
						: (a[o].style.display = 'none');
		})(r.value);
	});
	let s = (e) => {
		let t = document.querySelector('.modal-wrapper');
		console.log(d(e)), (t.style.backgroundColor = `${d(e)}`);
	};
	function d(e) {
		return {
			bug: '#26de81',
			dragon: '#ffeaa7',
			electric: '#fed330',
			fairy: '#FF0069',
			fighting: '#30336b',
			fire: '#f0932b',
			flying: '#81ecec',
			grass: '#00b894',
			ground: '#EFB549',
			ghost: '#a55eea',
			ice: '#74b9ff',
			normal: '#95afc0',
			poison: '#6c5ce7',
			psychic: '#a29bfe',
			rock: '#2d3436',
			water: '#0190FF',
		}[e];
	}
	return {
		add: t,
		getAll: a,
		addListItem: function e(t) {
			let a = document.querySelector('.pokemon-list'),
				i = document.createElement('li'),
				r = document.createElement('button');
			(r.innerText = t.name),
				r.classList.add('button-class'),
				i.appendChild(r),
				a.appendChild(i),
				(function e(t, a) {
					t.addEventListener('click', function () {
						var e;
						let t, i, r, d, p, c, m, h, u, f, g, y, k, E;
						(e = a),
							(t = document.querySelector('#modal-container')),
							(t.innerHTML = ''),
							(i = document.createElement('div')),
							(r = document.createElement('button')),
							(r.innerText = 'Close'),
							r.classList.add('modal-close'),
							(d = document.createElement('div')),
							(p = document.createElement('img')),
							(c = document.createElement('h2')),
							(m = document.createElement('div')),
							(h = document.createElement('div')),
							(u = document.createElement('div')),
							(f = document.createElement('h3')),
							(g = document.createElement('p')),
							u.appendChild(g),
							u.appendChild(f),
							(y = document.createElement('div')),
							(k = document.createElement('h3')),
							(E = document.createElement('p')),
							y.appendChild(E),
							y.appendChild(k),
							h.appendChild(u),
							h.appendChild(y),
							m.classList.add('pokemon-types'),
							n(e).then(() => {
								(p.src = e.imgUrl),
									(c.innerText = e.name),
									o(m, e.types),
									(f.innerText = 'Height'),
									(g.innerText = e.height),
									(k.innerText = 'Weght'),
									(E.innerText = e.weight),
									s(e.types[0].type.name);
							}),
							d.append(p),
							d.append(c),
							d.appendChild(m),
							d.append(h),
							c.classList.add('pokemon-name'),
							g.classList.add('pokemon-stats'),
							E.classList.add('pokemon-stats'),
							i.classList.add('modal-wrapper'),
							h.classList.add('pokemon-stats'),
							d.classList.add('modal'),
							i.appendChild(r),
							i.appendChild(d),
							t.appendChild(i),
							t.classList.add('is-visible'),
							r.addEventListener('click', l);
					});
				})(r, t);
		},
		loadList: function e() {
			return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
				.then(function (e) {
					return e.json();
				})
				.then(function (e) {
					e.results.forEach((e) => {
						t({ name: e.name, datailUrl: e.url });
					});
				})
				.catch(function (e) {
					console.error(e);
				});
		},
		loadDetails: n,
	};
})();
function findByName(e) {
	function t(t) {
		if (t.name === e) return t.name;
	}
	return 0 !== pokemonRepository.getAll().filter(t).length
		? pokemonRepository.getAll().filter(t)
		: `Pokemon with Name ${e} not found.`;
}
pokemonRepository.loadList().then(() => {
	pokemonRepository.getAll().forEach(function (e) {
		pokemonRepository.addListItem(e);
	});
}),
	pokemonRepository.add({});
