import { connect } from 'react-redux';
import { setDisplay } from '../actions/index';
import { addFriend } from '../actions/friendList';
import { fetchGetGroupList, changeActiveGroup } from '../actions/groupList';
import { fetchGetGroupFriends } from '../actions/groupFriends';
import { fetchGetDebtList } from '../actions/debtList';
import App from '../components/App';

<<<<<<< HEAD
const mapStateToProps = (state, ownProps) => {
  return {
    friendList: state.friendList.list,
    groupList: state.groupList.list,
    display: state.display,
    username: state.login.username,
  };
};
=======
const mapStateToProps = (state) => ({
  friendList: state.friendList.list,
  groupList: state.groupList.list,
  display: state.display,
  username: state.login.username,
});
>>>>>>> master

const mapDispatchToProps = (dispatch) => ({
  clickFList: () => {
    dispatch(setDisplay('friendList'));
  },
  clickGroup: (username, groupName) => {
    dispatch(fetchGetGroupFriends(username, groupName));
    dispatch(fetchGetDebtList(username, groupName));
    dispatch(changeActiveGroup(groupName));
  },
  addFriend: (target) => {
    dispatch(addFriend(target));
  },
  fetchGetGroupList: (username) => {
    dispatch(fetchGetGroupList(username));
  },
});

const DisplayApp = connect(
  mapStateToProps,
	mapDispatchToProps
)(App);

export default DisplayApp;
