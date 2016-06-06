import { connect } from 'react-redux'
import { addGroup, addGroupFriend, resetGroupFriends } from '../actions'
import addingGroup from '../components/addGroup'

const mapStateToProps = (state, ownProps) => {
  return {
	  friendList: state.groupFriends	
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitGroup: (groupName) => {
			if(!groupName.value.trim()){
			  return;
			}
			dispatch(addGroup({
			  name: groupName.value,
				friends: friendsInGroup
			}));
			dispatch(resetGroupFriends());
			groupName.value = '';
		},
		submitFriend: (friendName) => {
      if(!friendName.value.trim()){
			  return;
			}
			dispatch(addGroupFriend(friendName.value));
			friendName.value='';
		}	
	}
}

const AddGroup = connect(
  mapStateToProps,
  mapDispatchToProps	
)(addingGroup)

export default AddGroup
