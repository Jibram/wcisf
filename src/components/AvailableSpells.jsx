import React from 'react';
import axios from 'axios';

export default class AvailableSpells extends React.Component{
    state = {
        spells: [],
        update: false
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

    addSpell = async (e) => {
        console.log(this.props.charID, e.target.id)
        await axios.get('http://localhost:5000/addSpellToCharacter', {
            params : {
                charID: this.props.charID,
                spellID: e.target.id
            }
        })
        this.setState({update:!this.state.update})
    }

    populate = () => {
        var spells = []
        for (var i = 0; i < this.state.spells.length; i++) {
            spells.push(
                <p key={this.state.spells[i][0]}>
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