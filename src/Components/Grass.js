import {Component} from 'react';

//Grass is responsible for displaying wildPokemon sent from Finder.js. It also invokes
//the catch function, creating a req.body and passing it as an argument to catchFn.
class Grass extends Component {
    handleCatch = () => {
        const {pokemon} = this.props;
        let newPokemon = {
            name: pokemon.name,
            image: pokemon.sprites.front_default
        }

        this.props.catchFn(newPokemon);
        this.props.refreshFn();
    }

    render(){
        return (
            <div onClick={this.handleCatch}>
                <img src={this.props.pokemon.sprites.front_default} alt={this.props.pokemon.name}/>
                <p>{this.props.pokemon.name}</p>
            </div>
        )
    }
}

export default Grass;