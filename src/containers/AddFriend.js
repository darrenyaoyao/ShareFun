import React from 'react';
import { connect } from 'react-redux';
import { fetchAddFriend } from '../actions/friendList';

const mapStateToProps = (state) => ({
  username: state.login.username,
});

const AddFriend = ({ dispatch, username }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(fetchAddFriend(username, input.value));
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
  username: React.PropTypes.string,
};

const AddFriendContainer = connect(mapStateToProps)(AddFriend);

export default AddFriendContainer;
