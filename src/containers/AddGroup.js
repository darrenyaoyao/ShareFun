import React from 'react';
import { connect } from 'react-redux';
import { fetchAddGroup } from '../actions/groupList';
import { addGroupFriend, resetGroupFriends } from '../actions/groupFriends';
import './AddGroup.css';

const mapStateToProps = (state) => ({
  groupFriends: state.groupFriends,
  username: state.login.username,
});

const AddGroup = ({ dispatch, groupFriends, username }) => {
  let groupName;
  let friendName;
  return (
    <div className="main-block">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!groupName.value.trim()) { return; }
          dispatch(fetchAddGroup(username, groupName.value, [...groupFriends, username]));
          dispatch(resetGroupFriends());
          groupName.value = '';
        }}
      >
        <button type="submit" className="btn btn-lg btn-link"> Create Group </button> <br />
        groupName: <input ref={node => { groupName = node; }} />
      </form>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!friendName.value.trim()) { return; }
          dispatch(addGroupFriend(friendName.value));
          friendName.value = '';
        }}
      >
        friend: <input ref={node => { friendName = node; }} />
        <button type="submit"> add Friend </button>
      </form>
      <ul>{groupFriends.map(x => (
        <li> {x} </li>
      ))}</ul>
    </div>
	);
};

AddGroup.propTypes = {
  dispatch: React.PropTypes.func,
  username: React.PropTypes.string,
  groupFriends: React.PropTypes.array,
};

const AddGroupContainer = connect(mapStateToProps)(AddGroup);

export default AddGroupContainer;
