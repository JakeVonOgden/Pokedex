import React from 'react';
import './pokedex.css';
import Info from '../Info/Info';
import {useEffect, useState} from 'react';

const Pokedex = () => {
    const [allPokemon, setAllPokemon] = useState([]);
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=24');
    const [cardClicked, setCardClicked] = useState(false);
    const [singlePokemon, setSinglePokemon] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [weight, setWeight] = useState(0);
    const [stats, setStats] = useState([]);
    const [abilities, setAbilities] = useState([])
    const [baseExp, setBaseExp] = useState(0);

    const getInfo = (pokemon) => {
        setCardClicked(true);
        setSinglePokemon(pokemon.name)
        setType(pokemon.types[0].type.name)
        setImage(pokemon.sprites.other.dream_world.front_default)
        setWeight(pokemon.weight)
        setStats(pokemon.stats)
        setAbilities(pokemon.abilities)
        setBaseExp(pokemon.base_experience)
    }
    
    const getAllPokemon = async() => {
        
        const res = await fetch(loadMore)
        const data = await res.json()
        setLoadMore(data.next)
    
        function createPokemonObject (result) {
          result.forEach(async (pokemon) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            const data = await res.json()
            setAllPokemon(currentList => [...currentList, data])
          })
        }
        
        createPokemonObject(data.results);
        await console.log(allPokemon);
    }

    useEffect(() => {
        getAllPokemon()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const goBack = () => { setCardClicked(false); }

    const pokemonMapper = () => {
        return allPokemon.map((pokemon, index) => {
            return (
                <>
                    <div className={`thumb-container ${pokemon.types[0].type.name}`} onClick={() => {getInfo(pokemon); console.log(pokemon)} }>
                        <div className="number">
                            <small>#0{pokemon.id}</small>
                        </div>
                        <img src={pokemon.sprites.other.dream_world.front_default} alt="pokemon"/>
                        <div className="detail-wrapper">
                            <h3>{pokemon.name}</h3>
                            <small> Type: {pokemon.types[0].type.name} </small>
                        </div>
                    </div>
                </>
            )
        })
    } 
    
    return (
        <>
        { cardClicked === false 
          ?
            <div className="app-container">
                <h1>National Pokédex</h1>
                <div className="pokemon-container">
                    <div className="all-container">
                        {pokemonMapper()}
                    </div>
                    <button className="load-more" onClick={() => getAllPokemon()}>Load More</button>
                </div>
            </div>
          :
        <>
            <div className="info-container">
                <div>
                    <button type="button" className="back-btn" onClick={goBack}> Go Back </button>
                </div>
                <Info 
                    name={singlePokemon} 
                    type={type} 
                    image={image} 
                    weight={weight} 
                    abilities={abilities} 
                    baseExp={baseExp} 
                    stats={stats}
                    cardClicked={cardClicked}
                />
            </div>
        </>
        }
        </>
    )
}


export default Pokedex