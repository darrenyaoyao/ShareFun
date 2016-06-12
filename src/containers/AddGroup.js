import React from 'react'
import { connect } from 'react-redux'
import { fetchAddGroup, 
	       addGroupFriend, 
				 resetGroupFriends 
       } from '../actions'
import './AddGroup.css'

const mapStateToProps = (state, ownProps) => {
  return {
	  groupFriends: state.groupFriends,
		username: state.login.username
	}
}

let AddGroup = ({dispatch, groupFriends, username}) => {
	let groupName;
	let friendName;
  return (
	  <div className="main-block">
		  <form onSubmit={ e=>{
		    e.preventDefault();	
				if(!groupName.value.trim()){
				  return;
				}
				dispatch(fetchAddGroup(username, groupName.value, [...groupFriends, username]));
				dispatch(resetGroupFriends())
				groupName.value = '';
			}}>
			  <button type="submit" className="btn btn-lg btn-link"> Create Group </button> <br/>
		    groupName: <input ref={node=>{groupName=node}}/>
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
