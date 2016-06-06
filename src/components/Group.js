import React, { Component } from 'react';


export default class Group extends Component {
  render() {
		const { handleLogin } = this.props;
    return (
			<div>
			  <h2> {this.props.params.groupName}</h2>
			</div>
		);	  
	} 
}
