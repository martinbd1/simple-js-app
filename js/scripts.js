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
        let pokemonList = document.querySelector(".list-group");
        let button = document.createElement("button");
        let listpokemon = document.createElement("div");
        
        button.classList.add("list-group-item", "list-group-item-action", "search-button"); // 'list-group-item' Bootstrap as a class added to the listpokemon   
        
        button.setAttribute("data-target", "#pokemonModal");
        button.setAttribute("data-toggle", "modal");
        
        button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.substring(1) ; // button text/description is the "name" of the pokemon
        button.classList.add("btn", "btn-primary") // Bootstrap 'btn-primary' class

        listpokemon.appendChild(button); // button is added to the item list
        pokemonList.appendChild(listpokemon);

        button.addEventListener("click", function () { // function to add an event listener to a button that pass details of the pokemon when the button is clicked
            showDetails(pokemon);
        });
    }

    //function to load list of pokemon from api
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

    // loads details of the pokemon into the pokemonList
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            details.types.forEach(function (element) {
                item.types.push(element.type.name);
            })
            item.abilities = [];
            details.abilities.forEach(function (element) {
                item.abilities.push(element.ability.name);
            })
        }).catch(function (e) {
            console.error(e);
        });
    }

    //function that load the pokemon api into the modal
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //Explanation: function to show a Modal with details about a pokemon.
    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        modalTitle.empty();
        modalBody.empty();

        //creating element for in modal content
        let nameElement = $("<h1>" + pokemon.name[0].toUpperCase() + pokemon.name.substring(1)  + "</h1>");
        let imageElementFront = $('<img class="modal-img" style=width:50%" alt="pokemon front">');
        imageElementFront.attr("src", pokemon.imageUrlFront);
        let imageElementBack = $('<img class="modal-img" style=width:50%" alt="pokemon back">');
        imageElementBack.attr("src", pokemon.imageUrlBack);
        let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
        let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
        let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");
        let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }

    // // search bar functionality https://www.w3schools.com/jquery/jquery_filters.asp
    $(document).ready(function () {
        $("#pokemon-search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".search-button").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    // these are created so you can access functions from the iife elsewhere in the code
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,

    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});