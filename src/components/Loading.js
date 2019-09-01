import React, { Component } from 'react';

export class Loading extends Component {
  render() {
    console.log('__ RENDERING LOAD MORE');
    console.log(this.props)
    return (
      <div className="loading">
        <h1>{ 'Loading results for "' + this.props.searchTerm + '".' }</h1>
      </div>
    );
  }
}
