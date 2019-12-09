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

    deleteSpell = async (e) => {
        let tempID = e.target.id
        await axios.delete('http://localhost:5000/removeSpellFromCharacter', {
            params: {
                charID: this.props.charID,
                spellID: tempID
            }
        })
        let spells = this.state.spells
        for (let i = 0; i < spells.length; i++) {
            if (spells[i][1] === tempID){
                delete spells[i]
                break;
            }
        }
        this.setState({spells})
    }

    populate = () => {
        var spells = []
        for (var i = 0; i < this.state.spells.length; i++) {
            spells.push(
                <p key={this.state.spells[i][1]}>
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