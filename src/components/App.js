import React from 'react';
import axios from 'axios';
import './App.css';
import SignInComponent from './SignInComponent';
import CharacterSelect from './CharacterSelect';
import Character from './Character';
import LearnedSpells from './LearnedSpells';
import AvailableSpells from './AvailableSpells';

class App extends React.Component {
  state = {
    player: {
      id: 0,
      name: ""
    },
    char: {
      id: 0,
      name: "",
      level: 0,
      class: "",
      race: ""
    }
  }

  componentDidUpdate() {
    console.log(this.state.char)
  }

  updateName = (e) => {
    var player = this.state.player
    player.name = e.target.value
    this.setState({player:player})
  }

  createUser = async() => {
    await axios.get('http://localhost:5000/createPlayer', {
      params: {
        player: this.state.player.name
      }
    })
  }

  signIn = async() => {
    let res = await axios.get('http://localhost:5000/signIn', {
      params: {
        player: this.state.player.name
      }
    });
    let player = this.state.player
    player.id = res.data
    this.setState({player})
  }

  updateCharName = (e) => {
    var char = this.state.char
    char.name = e.target.value
    this.setState({char:char})
  }

  updateCharLvl = (e) => {
    var char = this.state.char
    char.level = e.target.value
    this.setState({char:char})
  }

  updateCharClass = (e) => {
    var char = this.state.char
    char.class = e.target.value
    this.setState({char:char})
  }

  updateCharRace = (e) => {
    var char = this.state.char
    char.race = e.target.value
    this.setState({char:char})
  }

  createChar = async() => {
    await axios.get('http://localhost:5000/createCharacter', {
      params: {
        playerID: this.state.player.id,
        charName: this.state.char.name,
        lvl: this.state.char.level,
        className: this.state.char.class,
        race: this.state.char.race
      }
    })
  }

  charSelect = () => {
    var e = document.getElementById("charDropdown");
    var value = e.options[e.selectedIndex].value;
    var char = this.state.char;
    value = value.split(',');
    char.id = value[0];
    char.name = value[1];
    char.level = value[3];
    char.class = value[4];
    char.race = value[5];
    this.setState({char});
  }

  viewSelect = () => {
    if (this.state.player.id === 0) {
      return <SignInComponent updateName={this.updateName} createUser={this.createUser} signIn={this.signIn} playerName={this.state.player.name}/>
    }
    else {
      return (
        <div>
          <h2>Welcome, {this.state.player.name}</h2>
          <CharacterSelect playerID={this.state.player.id} handleCharSelect={this.charSelect} updateCharClass={this.updateCharClass} updateCharLvl={this.updateCharLvl} updateCharName={this.updateCharName} updateCharRace={this.updateCharRace} createChar={this.createChar}/>
          {this.state.char.id !== 0 ? <Character {...this.state.char}/> : ''}
          {this.state.char.id !== 0 ? <LearnedSpells charID={this.state.char.id}/> : ''}
          {this.state.char.id !== 0 ? <AvailableSpells charID={this.state.char.id} charClass={this.state.char.class}/> :""}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>What Can I Spell?</h1>
          <h2>The DnD 5e Spellbook Database</h2>
          {this.viewSelect()}
        </header>
      </div>
    )
  }
}

export default App;
