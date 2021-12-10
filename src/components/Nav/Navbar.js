import React from 'react';
import Pokedex from '../Pokedex/Pokedex';
import Info from '../Info/Info';
import { Route, Switch,} from 'react-router-dom';
import PokeBall from '../../assetts/pokeball-png-photo-168542.png'
import './navbar.css';

const Navbar = () => {
    
    const Menu = () => (
        <>
            <p> <a href="/">Pokédex</a> </p>
            <p> <img src={PokeBall} alt="pokeball"/> </p>
        </>
    )
    
    return (
        <>
            <div className="poke__nav">
                <div className="poke__nav-links">
                    <div className="poke__nav-links_container">
                        <Menu />
                    </div>
                </div>
            </div>
            <Switch>
                <Route exact path='/'> <Pokedex /> </Route>
                <Route exact path='/info'> <Info /> </Route>
            </Switch>
        </>
    )
}

export default Navbar;