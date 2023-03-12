import Pagination from "./Pagination";
import {useEffect, useState} from "react";

export default function PokemonList({ pokemon, goToNextPage, goToPrevPage }) {
    require("./PokemonList.css");

    const [computedPokemon, setComputedPokemon] = useState([]);

    useEffect(() => {
        pokemon.forEach((p) => {
            fetch(p.url)
                .then((response) => response.json())
                .then((data) => {
                    setComputedPokemon((computedPokemon) => [...computedPokemon, data]);
                });
        });
    }, [ pokemon, setComputedPokemon ]);

    return <>
        <div className="pokemon-browser">
            <h2 className="pokemon-browser-title">Pokemon List</h2>
            <ul className="pokemon-browser-list">
                {pokemon.map((p) => (<li key={p.name} className="pokemon-browser-list-item">{p.name}</li>))}
            </ul>

            <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
        </div>
    </>;
}