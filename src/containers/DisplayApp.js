import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setDisplay } from '../actions/index';
import { fetchGetFriendList } from '../actions/friendList';
import { fetchGetGroupList, changeActiveGroup } from '../actions/groupList';
import { fetchGetGroupFriends, resetGroupFriends } from '../actions/groupFriends';
import { fetchGetDebtList } from '../actions/debtList';
import App from '../components/App';

const mapStateToProps = (state) => ({
  friendList: state.friendList.list,
  groupList: state.groupList.list,
  display: state.display,
  username: state.login.username,
});

const mapDispatchToProps = (dispatch) => ({
  clickFList: () => {
    dispatch(setDisplay('friendList'));
  },
  clickRepay: () => {
    dispatch(push('/app/repay'));
  },
  clickAddGroup: () => {
    dispatch(resetGroupFriends());
    dispatch(push('/app/addGroup'));
  },
  clickGroup: (username, groupName) => {
    dispatch(fetchGetGroupFriends(username, groupName));
    dispatch(fetchGetDebtList(username, groupName));
    dispatch(changeActiveGroup(groupName));
  },
  fetchGetGroupList: (username) => {
    dispatch(fetchGetGroupList(username));
  },
  fetchGetFriendList: (username) => {
    dispatch(fetchGetFriendList(username));
  },
});

const DisplayApp = connect(
  mapStateToProps,
	mapDispatchToProps
)(App);

export default DisplayApp;
