import {Component} from 'react';

class Pokemon extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            nameInput: ''
        }
    }

    //This method will update the nameInput value on state as a user types into the input below
    handleInput = (val) => {
        this.setState({nameInput: val})
    }

    //This method handles toggling in and out of our editing view(shown in conditional rendering below)
    handleToggle = () => {
        this.setState({isEditing: !this.state.isEditing})
    }

    handleEdit = (id) => {
        this.props.nameFn(id, this.state.nameInput);
        this.handleToggle();
    }

    render(){
        return (
            <div>
                <img src={this.props.pokemon.image} alt={this.props.pokemon.name}/>
                {this.state.isEditing
                ? (
                    <div>
                        <input 
                            value={this.state.nameInput}
                            onChange={e => this.handleInput(e.target.value)}/>
                        <button onClick={() => this.handleEdit(this.props.pokemon.id)}>Submit</button>
                    </div>
                )
                : (
                    <div>
                        <p>{this.props.pokemon.name}</p>
                        <button onClick={this.handleToggle}>Edit Name</button>
                    </div>
                )}
                <button onClick={() => this.props.releaseFn(this.props.pokemon.id)}>Release</button>
            </div>
        )
    }
}

export default Pokemon;