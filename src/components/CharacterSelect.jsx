import React from 'react';
import axios from 'axios';
import './select.css'

export default class CharacterSelect extends React.Component {
    state = {
        chars: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/getCharacters', {
            params: {
                playerID: this.props.playerID
            }
        })
        .then(res => this.setState({chars:res.data}));
    }

    populate = () => {
        var chars = []
        chars.push(<option>-Select-</option>)
        for (var i = 0; i < this.state.chars.length; i++) {
            chars.push(
                <option value={this.state.chars[i]}>
                    {this.state.chars[i][1]}
                </option>
            )
        }
        return chars
    }


    render() {
        return(
            <div>
                <h3>Select a character</h3> 
                <select class="select-css" id="charDropdown" onChange={this.props.handleCharSelect}>
                    {this.populate()}
                </select>
            </div>
        )
    }
}