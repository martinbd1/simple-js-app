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

    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        }
    };

})();

console.log(pokemonRepository.getAll());

//Adds a new pokemon and attributes to the Array
pokemonRepository.add({
    name: "Pikachu",
    height: 0.4,
    type: ["electric"]
});

console.log(pokemonRepository.getAll());

// a forEach loop that list the pokemons name and (height) and notes bigs ones
function pokemonLoop(pokemon) {

    if (pokemon.height > 1) {
        document.write("<p>" + pokemon.name + " (height:" + pokemon.height + ") - Wow, that's big!</p>");
    } else {
        document.write("<p>" + pokemon.name + " (height:" + pokemon.height + ")</p>");
    }
}
pokemonRepository.getAll().forEach(pokemonLoop);