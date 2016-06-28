/* eslint react/prefer-stateless-function: 0*/
import React, { Component } from 'react';
import AddDebt from '../containers/AddDebt';
import groupStyle from './AddGroup.css';
import adddebt from './AddDebt.css';
import { Col } from 'react-flexbox-grid';

export default class Group extends Component {
  render() {
    return (
      <Col className={adddebt.displaydebt} >
        <h2 className={groupStyle.groupHeader}> {this.props.params.groupName} </h2>
        <AddDebt />
      </Col>
    );
  }
}

Group.propTypes = {
  params: React.PropTypes.any,
};
