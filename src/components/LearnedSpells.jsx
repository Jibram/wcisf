import React from 'react';
import axios from 'axios';

export default class LearnedSpells extends React.Component {
    state = {
        spells: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/viewLearnedSpells', {
            params: {
                charID: this.props.charID
            }
        })
        .then(res => this.setState({spells:res.data}));
    }

    //TODO
    deleteSpell = async (e) => {
        await axios.delete('http://localhost:5000/removeSpellFromCharacter', {
            data: {
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
                    {this.state.spells[i][2] + " "}
                    <button id={this.state.spells[i][1]} onClick={this.deleteSpell}>Delete</button>
                </p>     
            )
        }
        return spells
    }

    render() {
        return(
            <div>
                <h3>Learned Spells:</h3>
                {this.populate()}
            </div>
        )
    }
}