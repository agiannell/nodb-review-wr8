//Controllers contain the handler functions for endpoints. When building a controller,
//you need to use module.exports to export your functions. You should export an object of
//methods (seen below), so that you can create as many handler functions as you need.
const axios = require('axios');

module.exports = {
    getWildPokemon: (req, res) => {
        const pokemonArray = [];

        const rand1 = Math.ceil(Math.random() * 151),
              rand2 = Math.ceil(Math.random() * 151),
              rand3 = Math.ceil(Math.random() * 151);

        axios.get(`https://pokeapi.co/api/v2/pokemon/${rand1}`)      
             .then(response => {
                 pokemonArray.push(response.data);
                 axios.get(`https://pokeapi.co/api/v2/pokemon/${rand2}`)
                    .then(response => {
                        pokemonArray.push(response.data)
                        axios.get(`https://pokeapi.co/api/v2/pokemon/${rand3}`)
                            .then(response => {
                                pokemonArray.push(response.data);
                                res.status(200).send(pokemonArray);
                            })
                    })
             })
            .catch(err => res.status(500).send(err));
    }
}