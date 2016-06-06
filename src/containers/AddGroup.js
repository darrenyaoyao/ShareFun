import React from 'react'
import { connect } from 'react-redux'
import { addGroup } from '../actions'

let AddGroup = ({dispatch}) => {
	let groupName;
	let friendName;
	let friendsInGroup = [];
  return (
	  <div>
		  <h2> Create Group </h2>
		  <form onSubmit={ e=>{
		    e.preventDefault();	
				if(!groupName.value.trim()){
				  return;
				}
				dispatch(addGroup({
				  name: groupName.value,
					friends: friendsInGroup
				}));
				console.log(friendsInGroup);
				React.forceUpdate();
				friendsInGroup = [];
				groupName.value = '';
			}}>
		    groupName: <input ref={node=>{groupName=node}}/>
			  <button type="submit"> add Group </button>
			</form>
			<form onSubmit={e=>{
			  e.preventDefault();
        if(!friendName.value.trim()){
				  return;
				}
				friendsInGroup.push(friendName.value);
				friendName.value='';
			}}>
			  friend: <input ref={node=>{friendName=node}}/>
			  <button type="submit"> add Friend </button>
			</form>
			<ul>{friendsInGroup.map(function(x){
			   return <li> {x} </li>
	    })}</ul>
		</div>
	)
}

AddGroup = connect()(AddGroup)

export default AddGroup
