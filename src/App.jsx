import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedType, setSelectedType] = useState('');
  const [randomPokemons, setRandomPokemons] = useState([]);

  useEffect(() => {
    if (selectedType) {
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then(response => response.json())
        .then(data => {
          const pokemonList = data.pokemon.map(pokemon => pokemon.pokemon.name);
          const randomPokemons = getRandomElements(pokemonList, 3);
          setRandomPokemons(randomPokemons);
        })
        .catch(error => console.error(error));
    }
  }, [selectedType]);

  const handleTypeSelection = (event) => {
    setSelectedType(event.target.value);
  };

  const getRandomElements = (array, numElements) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  };

  return (
    <div className="container">
      <select className="dropdown" onChange={handleTypeSelection}>
        <option value="">Selecciona un tipo</option>
        <option value="fire">Fuego</option>
        <option value="water">Agua</option>
        <option value="grass">Planta</option>
        <option value="electric">Eléctrico</option>
        <option value="ice">Hielo</option>
        <option value="flying">Volador</option>
        <option value="poison">Veneno</option>
        <option value="ground">Tierra</option>
        </select>
    {randomPokemons.length > 0 && (
      <div>
        <h3>Pokémon aleatorios del tipo {selectedType}:</h3>
        <ul className="pokemon-list">
            {randomPokemons.map(pokemon => (
              <li key={pokemon}>{pokemon}</li>
            ))}
          </ul>
      </div>
    )}
  </div>
);
}

export default App;