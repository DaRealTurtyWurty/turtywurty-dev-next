"use client";

import {useEffect, useState} from "react";
import PokemonList from "./PokemonList";

export default function Page() {
    const [pokemon, setPokemon] = useState([]);

    const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(currentPage).then((res) => res.json()).then((data) => {
            setPokemon(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);
            setLoading(false);
        });
    }, [currentPage, setPokemon, setNextPage, setPrevPage, setLoading]);

    if (loading) return (<h1>Loading...</h1>);

    return <>
        <PokemonList pokemon={pokemon}
                     goToNextPage={nextPage ? () => setCurrentPage(nextPage) : null}
                     goToPrevPage={prevPage ? () => setCurrentPage(prevPage) : null}/>
    </>;
}