import React, { Component } from 'react';
import AddDebt from '../containers/AddDebt';

export default class Group extends Component {
  componentWillMount() {
    console.log(123);
  }

  render() {
    return (
      <div>
        <h2> {this.props.params.groupName} </h2>
        <AddDebt />
      </div>
    );
  }
}

Group.propTypes = {
  params: React.PropTypes.any,
};
