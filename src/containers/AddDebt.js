import { connect } from 'react-redux';
import DebtList from '../components/AddDebt';

const mapStateToProps = (state) => ({
  groupFriends: state.groupFriends.list.filter((x) => (x !== state.login.username)),
  debtList: state.debtList.list,
  repayList: state.debtList.repayList,
  newDebt: state.newDebt,
  username: state.login.username,
  groupName: state.groupList.active,
});

const DebtListContainer = connect(mapStateToProps)(DebtList);

export default DebtListContainer;
