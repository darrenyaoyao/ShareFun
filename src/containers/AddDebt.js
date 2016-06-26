import React from 'react';
import { connect } from 'react-redux';
import { addDebtor, resetNewDebt } from '../actions/newDebt';
import { fetchAddDebt } from '../actions/debtList';
import './AddDebt.css';

const mapStateToProps = (state) => ({
  groupFriends: state.groupFriends,
  debtList: state.debtList.list,
  newDebt: state.newDebt,
  username: state.username,
  groupName: state.groupList.active,
});

const DebtList = ({ dispatch, debtList, newDebt, username, groupName }) => {
  let debtName;
  let debtor;
  let money;
  return (
    <div className="display-debt">
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(fetchAddDebt(username, groupName, {
            crditor: username,
            debtName: debtName.value,
            debtorList: newDebt,
          }));
          debtName.value = '';
          dispatch(resetNewDebt());
        }}
      >
        debtName: <input ref={node => { debtName = node; }} />
        <button type="submit"> add debt </button>
      </form>
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Money </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> <input ref={node => { debtor = node; }} /> </td>
            <td> <input ref={node => { money = node; }} /> </td>
            <button
              onClick={e => {
                e.preventDefault();
                dispatch(addDebtor({
                  debtor: debtor.value,
                  money: money.value,
                }));
                debtor.value = '';
                money.value = '';
              }}
            > add
            </button>
          </tr>
          {newDebt.map(x => (
            <tr>
              <td> {x.debtor} </td>
              <td> {x.money} </td>
            </tr>
           ))}
        </tbody>
      </table>
      <div className="debt-list">{
        debtList.map(x => (
          <div>
            <h3> {x.debtName} </h3>
            <h4> {x.creditor} </h4>
            <ul>{x.debtorList.map(y => (
              <li> {y.debtor.concat(' ').concat(y.money)} </li>)
						)}
            </ul>
          </div>
        ))
      }</div>
    </div>
	);
};

DebtList.propTypes = {
  dispatch: React.PropTypes.func,
  debtList: React.PropTypes.array,
  groupFriends: React.PropTypes.array,
  newDebt: React.PropTypes.array,
  username: React.PropTypes.string,
  groupName: React.PropTypes.string,
};

const DebtListContainer = connect(mapStateToProps)(DebtList);

export default DebtListContainer;
