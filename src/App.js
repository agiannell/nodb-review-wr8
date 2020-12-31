//Class Components are components capable of holding state and using lifecycle methods
//To build one, follow these steps:
//1. import React, {Component} from 'react
//2. Create a class that extends Component
//3. Return a JSX display using render
//4. Export the component

//To view how to build a functional component, visit ./Components/Header.js

import {Component} from 'react';
import Header from './Components/Header';
import Finder from './Components/Finder';
import Pokedex from './Components/Pokedex';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      caughtPokemon: []
    }
    this.catchPokemon = this.catchPokemon.bind(this);
  }

  componentDidMount(){
    //componentDidMount is a lifecycle method. It will fire after the first invocation of render
    //in the component. This is a great method for retrieving data from a server that you need 
    //in your component right away.
    axios.get('/api/caught-pokemon')
      .then(res => {
        this.setState({caughtPokemon: res.data});
      })
      .catch(err => console.log(err));
  }

  //This method will send a pokemon object to the server to be added to our API. To see
  //where this connects, view catchPokemon in server/pokemonCtrl.js, and to see where it
  //is invoked, visit Grass.js(referred to as this.props.catchFn)
  catchPokemon(pokemon){
    axios.post('api/caught-pokemon', {pokemon: pokemon})
      .then(res => {
        this.setState({caughtPokemon: res.data});
      })
      .catch(err => console.log(err));
  }

  //This method will update the name of a caughtPokemon. It takes id and newName as arguments,
  //passing them as a parameter(id) and a body(newName placed in the body obj on line 53). To see
  //where this connects, view editName in server/pokemonCtrl.js, and to see where it is invoked,
  //view Pokemon.js(referred to as nameFn).
  editName = (id, newName) => {
    let body = {name: newName};

    axios.put(`/api/caught-pokemon/${id}`, body)
         .then(res => {
           this.setState({caughtPokemon: res.data});
         })
         .catch(err => console.log(err));
  }

  //This method will remove a pokemon from our API. It takes an id to use as a parameter of our
  //axios request. To see where this connects, view releasePokemon in pokemonCtrl.js, and to see
  //where it is invoked, visit Pokemon.js(referred to as releaseFn)
  releasePokemon = (id) => {
    axios.delete(`/api/caught-pokemon/${id}`)
      .then(res => {
        this.setState({caughtPokemon: res.data})
      })
      .catch(err => console.log(err));
  }

  render(){
    //render is the only required lifecycle method in class components, as it is required to return
    //a JSX display from a component. All JSX in a component MUST be wrapped by a parent element.
    console.log(this.state.caughtPokemon)
    return (
      <div className="App">
        <Header />
        <Finder 
          catchFn={this.catchPokemon}/>
        <Pokedex 
          caughtPokemon={this.state.caughtPokemon}
          nameFn={this.editName}
          releaseFn={this.releasePokemon}/>
      </div>
    )
  }
}

export default App;
