import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

export const fetchThemeData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.results.map((pokemon) => ({
            name: pokemon.name,
            image: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
        }));
    } catch (error) {
        console.error('Error fetching theme data:', error);
        return [];
    }
};