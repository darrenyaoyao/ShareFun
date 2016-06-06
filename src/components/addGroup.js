import React, {Component} from 'react';

export default class Group extends Component{
  render() {
	  const {submitGroup,submitFriend, friendList} = this.props;
		let groupName='', friendName='';
		return (
		  <div>
			  <h2> Create Group </h2>
				<form onSubmit={submitGroup(groupName)}>
				  groupName: <input ref= {node=>{groupName=node}}/>
					<button type="submit"> add Group </button>
				</form>
				<form onSubmit={submitFriend(friendName)}>
				  friendName: <input ref= {node=>{friendName=node}}/>
					<button type="submit"> add Friend </button>
				</form>
				<ul>{
					friendList.map(function(x){
					  return <li> {x} </li> 													
				  })
				}</ul>
			</div>
		);
	}
}
