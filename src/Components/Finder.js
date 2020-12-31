import {Component} from 'react';
import axios from 'axios';
import Grass from './Grass';

//Finder contains the wildPokemon array as data, so that they can be sent to Grass to be displayed.
//Finder also is passed the catchPokemon function so that it can be passed to Grass to be invoked.
class Finder extends Component {
    constructor(props){
        super(props);
        this.state = {
            wildPokemon: []
        }
    }

    componentDidMount(){
        this.getWildPokemon();
    }

    //This method will get the wildPokemon. To see where this connects, view the handler function
    //found in server/grassCtrl.js
    getWildPokemon = () => {
        axios.get('/api/wild-pokemon')
            .then(res => {
                this.setState({wildPokemon: res.data});
            })
            .catch(err => console.log(err));
    }

    render(){
        //Mapping is a great way to reuse components. Here we are mapping over the wildPokemon
        //array, and then sending it to the Grass component to be displayed.
        console.log(this.state.wildPokemon)
        const mappedPokemon = this.state.wildPokemon.map((pokemon, i) => (
            <Grass 
                key={i}
                pokemon={pokemon}
                catchFn={this.props.catchFn}
                refreshFn={this.getWildPokemon}/>
        ))
        return (
            <div className='poke-flex'>
                {mappedPokemon}
            </div>
        )
    }
}

export default Finder;