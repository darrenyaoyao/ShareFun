import React, { Component } from 'react';
import AddDebt from '../containers/AddDebt';


export default class Group extends Component {
  render() {
		const { } = this.props;
    return (
			<div>
			  <h2> {this.props.params.groupName}</h2>
				<AddDebt/>
			</div>
		);	  
	} 
}
