// List of pokemon, thier 0name 1height and 2type, some pokemon have more than one type

let pokemonRepository = (function () {
    //Now wrappped in an IIED
    let pokemonList = [{
            name: "Bulbasaur",
            height: 0.7,
            type: ["grass", "poison"]
        },
        {
            name: "Ivysaur",
            height: 1,
            type: ["grass", "poison"]
        },
        {
            name: "Venusaur",
            height: 2,
            type: ["grass", "poison"]
        },
        {
            name: "Charmander",
            height: 0.6,
            type: ["fire"]
        },
        {
            name: "Squirtle",
            height: 0.5,
            type: ["water"]
        },
        {
            name: "Caterpie",
            height: 0.3,
            type: ["bug"]
        },
        {
            name: "Weedle",
            height: 0.3,
            type: ["bug", "poison"]
        },
    ];

    function add(pokemon) {
        if (typeof (pokemon) === 'object') {
            pokemonList.push(pokemon);
            console.log(pokemon.name + ' was added to the Pokédex successfully!')
        } else {
            console.log('Entry was not valid, please try again.')
        }
    };

    function getAll() {
        return pokemonList;
    };

    return {
        getAll: getAll,
        add: add
    };

})();

//pre
console.log(pokemonRepository.getAll());

//Adds a new pokemon to the Array
pokemonRepository.add({
    name: 'Pikachu',
    height: 0.4,
    type: ["electric"]
});

//post
console.log(pokemonRepository.getAll());

// a forEach loop that list the pokemons name and (height) and notes big ones
pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 1) {
        document.write("<p>this is " + pokemon.name + ", and it is" + pokemon.height + " meters tall - Wow, that's big!</p>");
    } else {
        document.write("<p>this is " + pokemon.name + ", and it is " + pokemon.height + "meters tall.</p>");
    }
});