// List of pokemon, thier 0name 1height and 2type, some pokemon have more than one type

let pokemonRepository = (function () {
    //Now wrappped in an IIFE
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    //Outside of IIFE

    //Checks if pokemon is valid object to add it to the list
    function add(pokemon) {
        if (typeof (pokemon) === 'object' &&
            "name" in pokemon
        ) {
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

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});