import React, {useEffect, useState} from 'react'
import Evolution from './Evolution';
import './info.css';


const Info = (props) => {
    
    const {weight, image, type, name, abilities, stats, baseExp} = props;
    
    const [pokemonData, setPokemonData] = useState([]);
    const [firstEvo, setFirstEvo] = useState("");
    const [secondEvo, setSecondEvo] = useState("");
    const [thirdEvo, setThirdEvo] = useState("");
    
    const fetchEvoChain = () => {
        
        if (firstEvo !== "") {return}

        if (pokemonData.evolution_chain !== undefined) {
            fetch(pokemonData.evolution_chain.url)
            .then((res) => res.json())
            .then((evoChain) => {
                console.log(evoChain)
                setFirstEvo(evoChain.chain.species.name)
                setSecondEvo(evoChain.chain.evolves_to[0].species.name)
                if (evoChain.chain.evolves_to[0].evolves_to[0] !== undefined) {

                    setThirdEvo(evoChain.chain.evolves_to[0].evolves_to[0].species.name)
                }
            })
        }
    }
    
    const fetchData = async() => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        const data = await res.json()
        setPokemonData(data);
    }
    
    useEffect(() => {
         fetchData();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if (pokemonData.evolution_chain !== undefined) { fetchEvoChain() }

    return (
        <>  
        {   pokemonData.pokedex_numbers !== undefined
            ?
            <>
                {console.log(pokemonData)}
                <div className="cards-container">
                    <div className="card-wrapper">
                        <div className="card-container">
                            <div className={`card ${type}`}>
                                <p class="id-number">#00{pokemonData.pokedex_numbers[0].entry_number}</p>
                                <div className="display">
                                    <div className="box-sizing">
                                        <img src={image} alt="pokemon" />
                                    </div>
                                </div>
                                <div className="bottom-section">
                                    <p class="type">{type} Type</p>
                                    <p class="name">{name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="bio-training">
                            <div className="bio-training-content">
                                <div className="details">
                                    <p className="title">Bio</p>
                                    <div className="flavor-text"><span> {name}, </span>  a <span> {type} type  pokemon. </span> {pokemonData.flavor_text_entries[0].flavor_text} </div>
                                    <div className="flex-col">
                                        <div className="flex-wrapper">
                                            <p className="bio-text">Genus:</p>
                                            <div class="sm-text">
                                                <p>{pokemonData.genera[7].genus}</p>
                                            </div>
                                        </div>
                                        <div className="flex-wrapper">
                                            <p className="bio-text">Height:</p>
                                            <div class="sm-text">
                                                <p>0.7m (2'3.6")</p>
                                            </div>
                                        </div>
                                        <div className="flex-wrapper">
                                            <p className="bio-text">Weight:</p>
                                            <div class="sm-text">
                                                <p> {weight} </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex-wrapper">
                                            <p className="bio-text">Abilities:</p>
                                            <div class="sm-text">
                                                <div className="flex-col">
                                                    <p className="abilities"> 
                                                        { 
                                                         abilities[0] !== undefined
                                                         ?
                                                          abilities[0].ability.name
                                                         :
                                                          <> N/A </>
                                                        }
                                                    </p>
                                                    <p className="abilities"> 
                                                        { 
                                                         abilities[1] !== undefined
                                                         ?
                                                          abilities[1].ability.name
                                                         :
                                                          <> </>
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="details">
                                    <p className="title">Training</p>
                                    <div className="flex-wrapper">
                                        <p className="bio-text">Base Exp:</p>
                                        <div className="sm-text">
                                            <p> {baseExp} </p>
                                        </div>
                                    </div>
                                    <div className="flex-wrapper">
                                        <p className="bio-text">Base Happiness:</p>
                                        <div className="sm-text">
                                            <p> {pokemonData.base_happiness} </p>
                                        </div>
                                    </div>
                                    <div className="flex-wrapper">
                                        <p className="bio-text">Catch Rate:</p>
                                        <div className="sm-text">
                                            <p> {pokemonData.capture_rate}% </p>
                                        </div>
                                    </div>
                                    <div className="flex-wrapper">
                                        <p className="bio-text">Growth Rate:</p>
                                        <div className="sm-text">
                                            <p className="abilities"> {pokemonData.growth_rate.name} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="details">
                                <p className="title">Evolution</p>
                                { firstEvo && secondEvo && thirdEvo !== ""
                                ?
                                    <Evolution firstEvo={firstEvo} secondEvo={secondEvo} thirdEvo={thirdEvo} name={name} type={type} />
                                :
                                null
                                }
                            </div>
                            <div className="details">
                                <p className="title">Stats</p>
                                <div className="stats-container">
                                    <div className="stats">
                                        <p className="bio-text">HP</p>
                                        <p className="xs-text"> {stats[0].base_stat} </p>
                                    </div>
                                    <div className="stats">
                                        <p className="bio-text">Atk</p>
                                        <p className="xs-text"> {stats[1].base_stat} </p>
                                    </div>
                                    <div className="stats">
                                        <p className="bio-text">Def</p>
                                        <p className="xs-text"> {stats[2].base_stat} </p>
                                    </div>
                                    <div className="stats">
                                        <p className="bio-text">Sp. Atk</p>
                                        <p className="xs-text"> {stats[3].base_stat} </p>
                                    </div>
                                    <div className="stats">
                                        <p className="bio-text">Sp. Def</p>
                                        <p className="xs-text"> {stats[4].base_stat} </p>
                                    </div>
                                    <div className="stats">
                                        <p className="bio-text">Speed</p>
                                        <p className="xs-text"> {stats[5].base_stat} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            :
            <>
            </>
        }
        </>
    )
}

export default Info;