import { connect } from 'react-redux';
import Repay from '../components/Repay';
import { fetchGetRepayList,
         fetchAddRepay } from '../actions/repayList';

const mapStateToProps = (state) => ({
  username: state.login.username,
  repayList: state.repayList.list,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGetRepayList: (username) => {
    dispatch(fetchGetRepayList(username));
  },
  addRepay: (username, groupName, debtor) => {
    dispatch(fetchAddRepay(username, groupName, debtor));
  },
});

const RepayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repay);

export default RepayContainer;
