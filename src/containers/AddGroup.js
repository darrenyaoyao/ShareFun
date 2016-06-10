import React from 'react'
import { connect } from 'react-redux'
import { addGroup, 
	       addGroupFriend, 
				 resetGroupFriends 
       } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
	  groupFriends: state.groupFriends
	}
}

let AddGroup = ({dispatch, groupFriends}) => {
	let groupName;
	let friendName;
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
					friends: groupFriends
				}));
				dispatch(resetGroupFriends())
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
				dispatch(addGroupFriend(friendName.value))
				friendName.value='';
			}}>
			  friend: <input ref={node=>{friendName=node}}/>
			  <button type="submit"> add Friend </button>
			</form>
			<ul>{groupFriends.map(function(x){
			   return <li> {x} </li>
	    })}</ul>
		</div>
	)
}

AddGroup = connect(mapStateToProps)(AddGroup)

export default AddGroup
