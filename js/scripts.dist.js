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
	function i() {
		return e;
	}
	let a = (e, t) => {
			t.forEach((t) => {
				console.log(t.type.name);
				let n = document.createElement('span');
				(n.textContent = t.type.name), e.appendChild(n);
			});
		},
		o = document.querySelector('#modal-container');
	function l() {
		document
			.querySelector('#modal-container')
			.classList.remove('is-visible');
	}
	return (
		o.addEventListener('click', (e) => {
			e.target === o && l();
		}),
		window.addEventListener('keydown', (e) => {
			let t = document.querySelector('#modal-container');
			'Escape' === e.key && t.classList.contains('is-visible') && l();
		}),
		{
			add: t,
			getAll: i,
			addListItem: function e(t) {
				let i = document.querySelector('.pokemon-list'),
					o = document.createElement('li'),
					s = document.createElement('button');
				(s.innerText = t.name),
					s.classList.add('button-class'),
					o.appendChild(s),
					i.appendChild(o),
					(function e(t, i) {
						t.addEventListener('click', function () {
							var e;
							let t, o, s, d, r, p, c, m, h, u, f, y, k, E;
							(e = i),
								(t =
									document.querySelector('#modal-container')),
								(t.innerHTML = ''),
								(o = document.createElement('div')),
								(s = document.createElement('button')),
								(s.innerText = 'Close'),
								s.classList.add('modal-close'),
								(d = document.createElement('div')),
								(r = document.createElement('img')),
								(p = document.createElement('h2')),
								(c = document.createElement('div')),
								(m = document.createElement('div')),
								(h = document.createElement('div')),
								(u = document.createElement('h3')),
								(f = document.createElement('p')),
								h.appendChild(f),
								h.appendChild(u),
								(y = document.createElement('div')),
								(k = document.createElement('h3')),
								(E = document.createElement('p')),
								y.appendChild(E),
								y.appendChild(k),
								m.appendChild(h),
								m.appendChild(y),
								c.classList.add('pokemon-types'),
								n(e).then(() => {
									(r.src = e.imgUrl),
										(p.innerText = e.name),
										a(c, e.types),
										(u.innerText = 'Height'),
										(f.innerText = e.height),
										(k.innerText = 'Weght'),
										(E.innerText = e.weight);
								}),
								d.append(r),
								d.append(p),
								d.appendChild(c),
								d.append(m),
								p.classList.add('pokemon-name'),
								f.classList.add('pokemon-stats'),
								E.classList.add('pokemon-stats'),
								o.classList.add('modal-wrapper'),
								m.classList.add('pokemon-stats'),
								d.classList.add('modal'),
								o.appendChild(s),
								o.appendChild(d),
								t.appendChild(o),
								t.classList.add('is-visible'),
								s.addEventListener('click', l);
						});
					})(s, t);
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
		}
	);
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
