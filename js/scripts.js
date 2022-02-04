// List of pokemon, thier 0name 1height and 2type, some pokemon have more than one type

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

console.log(pokemonList);


// a forEach loop that list the pokemons name and (height) and notes bigs ones

// pokemonList.forEach(function(pokemon) {
//     if (pokemon.height > 1) {
//         document.write("<p>" + pokemon.name + " (height:" + pokemon.height + ") - Wow, that's big!</p>");
//     } else {
//         document.write("<p>" + pokemon.name + " (height:" + pokemon.height + ")</p>");
//     }
// })

function pokemonLoop(pokemon) {

    if (pokemon.height > 1) {
        document.write("<p>" + pokemon.name + " (height:" + pokemon.height + ") - Wow, that's big!</p>");
    } else {
        document.write("<p>" + pokemon.name + " (height:" + pokemon.height + ")</p>");
    }
}
pokemonList.forEach(pokemonLoop);