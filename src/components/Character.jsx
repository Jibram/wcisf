import React from 'react';

export default class Character extends React.Component {
    render () {
        return(
            <div>
                <br/>
                {this.props.name}, the level {this.props.level} {this.props.class} {this.props.race}
            </div>
        )
    }
}