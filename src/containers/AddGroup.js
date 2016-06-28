import { connect } from 'react-redux';
import AddGroup from '../components/AddGroup';

const mapStateToProps = (state) => ({
  groupFriends: state.groupFriends.list,
  username: state.login.username,
});

const AddGroupContainer = connect(mapStateToProps)(AddGroup);

export default AddGroupContainer;
