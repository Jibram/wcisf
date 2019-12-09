import React from 'react';
import axios from 'axios';

export default class AvailableSpells extends React.Component{
    state = {
        spells: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/getAvailableSpells', {
            params: {
                charID: this.props.charID,
                charClass: this.props.charClass
            }
        })
        .then(res => this.setState({spells:res.data}));
    }

    //TODO
    addSpell = async (e) => {
        await axios.post('http://localhost:5000/addSpellToCharacter', {
            data : {
                charID: this.props.charID,
                spellID: 0 // NOT SURE HOW TO GET THIS
            }
        })
    }

    populate = () => {
        var spells = []
        for (var i = 0; i < this.state.spells.length; i++) {
            spells.push(
                <p>
                    {this.state.spells[i][1] + " "}
                    <button id={this.state.spells[i][0]} onClick={this.addSpell}>Add</button>
                </p>     
            )
        }
        return spells
    }

    render() {
        return(
            <div>
                <h3>Other Available Spells:</h3>
                {this.populate()}
            </div>
        )
    }
}