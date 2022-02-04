import React, { Component } from 'react';

export class Button extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (<div>
        <button type="button" className="btn btn-dark" disabled={this.props.disable} onClick={this.props.handler}>{this.props.title} </button>
    </div>);
  }
}

export default Button;






