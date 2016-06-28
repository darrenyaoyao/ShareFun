import { connect } from 'react-redux';
import AddGroup from '../components/AddGroup';

const mapStateToProps = (state) => ({
  groupFriends: state.groupFriends.list,
  username: state.login.username,
  friendList: state.friendList.list,
  groupList: state.groupList.list,
  err: [state.groupFriends.err, state.groupList.err],
});

const AddGroupContainer = connect(mapStateToProps)(AddGroup);

export default AddGroupContainer;
