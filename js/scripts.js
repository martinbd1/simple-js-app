// List of pokemon, thier 0name 1height and 2type, some pokemon have more than one type

let pokemonRepository = (function () {
    //Now wrappped in an IIFE
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
    //OUside of IIFE


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

    // function that creates a list as buttons of pokemon
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class")
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        // function to add an event listener to a button that pass details of the pokemon when the button is clicked
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
    };

})();

//Adds a new pokemon to the Array
pokemonRepository.add({
    name: "Pikachu",
    height: 0.4,
    type: ["electric"]
});

console.log(pokemonRepository.getAll());

// a forEach loop that list the pokemons name and (height) and notes big ones
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
});