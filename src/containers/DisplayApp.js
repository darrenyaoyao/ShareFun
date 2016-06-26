import { connect } from 'react-redux';
import { setDisplay } from '../actions/index';
import { addFriend } from '../actions/friendList';
import { fetchGetGroupList } from '../actions/groupList';
import { fetchGetGroupFriends } from '../actions/groupFriends';
import { fetchGetDebtList } from '../actions/debtList';
import App from '../components/App';

const mapStateToProps = (state) => ({
  friendList: state.friendList,
  groupList: state.groupList.list,
  display: state.display,
  username: state.login.username,
});

const mapDispatchToProps = (dispatch) => ({
  clickFList: () => {
    dispatch(setDisplay('friendList'));
  },
  clickGroup: (username, groupName) => {
    dispatch(fetchGetGroupFriends(username, groupName));
    dispatch(fetchGetDebtList(username, groupName));
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
