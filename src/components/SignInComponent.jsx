import React from 'react';
import axios from 'axios';

export default class SignInComponent extends React.Component {
    render() {
        return (
            <div>
                <form>
                    Username:
                    <input type="text" onChange={this.props.updateName}/>
                </form>
                <button onClick={this.props.signIn}>Sign In</button>
                <br/>
                OR
                <br/>
                <form>
                    Create username:
                    <input type="text" onChange={this.props.updateName}/>
                </form>
                <button onClick={this.props.createUser}>Sign In</button>
            </div>
        )
    }
}