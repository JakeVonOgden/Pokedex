import React, {useState, useEffect} from 'react'
import './info.css';

const Evolution = (props) => {

    const [base, setBase] = useState([]);
    const [middle, setMiddle] = useState([]);
    const [final, setFinal] = useState([]);
    
    const fetchThird = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.thirdEvo}`)
        .then((res) => res.json())
        .then((thirdEvo) => {
            console.log(thirdEvo)
            setFinal(thirdEvo)
        })
    }
    
    const fetchSecond = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.secondEvo}`)
        .then((res) => res.json())
        .then((secondEvo) => {
            console.log(secondEvo)
            setMiddle(secondEvo)
        })
        if (props.thirdEvo !== "") {
            fetchThird()
        }
    }
    
    const fetchBase = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.firstEvo}`)
        .then((res) => res.json())
        .then((basePokemon) => {
            console.log(basePokemon)
            setBase(basePokemon)
        })
        fetchSecond()
    }
    
    useEffect(() => {
        fetchBase()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <>
            <div className="evo-wrapper">
                
                <div className="evo-card">
                    <p className="xs-text">#00{base.id}</p>
                    <div className={`evo-img ${props.type}`}>
                        <div className="display">
                            <div className="box-sizing">
                        {   base.sprites !== undefined
                            ?
                                <img src={base.sprites.other.dream_world.front_default} alt="pokemon" />
                            :
                            null
                        }
                            </div>
                        </div>
                    </div>
                    <p className="xs-text">{base.name}</p>
                </div>
                
                <div className="evo-card">
                    <p className="xs-text">#00{middle.id}</p>
                    <div className={`evo-img ${props.type}`}>
                        <div className="display">
                            <div className="box-sizing">
                        {   middle.sprites !== undefined
                            ?
                                <img src={middle.sprites.other.dream_world.front_default} alt="pokemon" />
                            :
                            null
                        }
                            </div>
                        </div>
                    </div>
                    <p className="xs-text">{middle.name}</p>
                </div>
                
                <div className="evo-card">
                    <p className="xs-text">#00{final.id}</p>
                    <div className={`evo-img ${props.type}`}>
                        <div className="display">
                            <div className="box-sizing">
                        {   final.sprites !== undefined
                            ?
                                <img src={final.sprites.other.dream_world.front_default} alt="pokemon" />
                            :
                            null
                        }
                            </div>
                        </div>
                    </div>
                    <p className="xs-text">{final.name}</p>
                </div>
            </div>
        </>
    )
}

export default Evolution;


                                




                
