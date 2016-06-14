import React from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../actions/friendList';

const AddFriend = ({ dispatch }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) { return; }
          dispatch(addFriend(input.value));
          input.value = '';
        }}
      >
        <input ref={node => { input = node; }} />
        <button type="submit">
          Add Friend
        </button>
      </form>
    </div>
  );
};

AddFriend.propTypes = {
  dispatch: React.PropTypes.func,
};

const AddFriendContainer = connect()(AddFriend);

export default AddFriendContainer;
