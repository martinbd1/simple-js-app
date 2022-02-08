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
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

       
    //function that load the pokemon api into the modal
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon.name, 'height: ' + pokemon.height, pokemon.imageUrl);
        });
    }

    // Addding modal per 1.8
    function showModal(title, text, img_src) {
        let modalContainer = document.querySelector('#modal-container');

        // Clear preexisting content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';

        // Close modal when user clicks on 'Close'
        closeButtonElement.addEventListener('click', hideModal);

        let modalTitle = document.createElement('h1');
        modalTitle.innerText = title;

        let modalText = document.createElement('p');
        modalText.innerText = text;

        let modalImg = document.createElement('img')
        modalImg.classList.add('modal-img');
        modalImg.src = img_src;


        modal.appendChild(closeButtonElement);
        modal.appendChild(modalTitle);
        modal.appendChild(modalText);
        modal.appendChild(modalImg);
        modalContainer.appendChild(modal);

        // make modal visible
        modalContainer.classList.add('is-visible');

        // Close modal when user clicks on 'Close'
        closeButtonElement.addEventListener('click', hideModal);

        // Close modal when modal is open and user clicks outside of the modal
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    document.querySelector('#show-modal').addEventListener('click', function () {});

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    // Close modal when modal is open and user clicks 'Escape'
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

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