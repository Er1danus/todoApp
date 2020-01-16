import React, { Component } from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {


  constructor() {
    super();
    this.state = {
      term: ''
    }
    this.onLabelSearch = (e) => {
      const term = e.target.value;
      this.setState({term});
      this.props.onLabelSearch(term)
    }
  }

  render() {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={this.onLabelSearch}
                value={this.state.term}/>
    );
  }
};
