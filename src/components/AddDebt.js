import React from 'react';
import { fetchAddDebt, fetchGetGroupRepay } from '../actions/debtList';
import { RaisedButton, TextField } from 'material-ui';
import { Table, TableBody, TableHeader,
         TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import adddebt from './AddDebt.css';

const DebtList = ({ dispatch, debtList,
                    username, groupName,
                    repayList, groupFriends }) => {
  let debtName;
  const moneyRefs = [];
  return (
    <div>
      <RaisedButton
        primary
        onMouseDown={() => { dispatch(fetchGetGroupRepay(username, groupName)); }}
      > settle debt </RaisedButton>
      <div hidden={repayList.length === 0}>
        <h3> Summay of Debt </h3>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>people</TableHeaderColumn>
              <TableHeaderColumn>money</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            repayList.map((x) => (
              <TableRow>
                <TableRowColumn>{x.debtor}</TableRowColumn>
                <TableRowColumn>{x.money}</TableRowColumn>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
        <br />
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          const newDebt = [];
          const len = groupFriends.length;
          for (let i = 0; i < len; i++) {
            if (moneyRefs[i].getValue()) {
              newDebt.push({
                debtor: groupFriends[i],
                money: 1.0 * moneyRefs[i].getValue(),
              });
              moneyRefs[i].getInputNode().value = '';
            }
          }
          dispatch(fetchAddDebt(username, groupName, {
            creditor: username,
            debtName: debtName.getValue(),
            debtorList: newDebt,
          }));
          debtName.getInputNode().value = '';
        }}
      >
        DebtName: <TextField ref={x => { debtName = x; }} />
        <RaisedButton type="submit"> add debt </RaisedButton>
      </form>
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn> Name </TableHeaderColumn>
            <TableHeaderColumn> Money </TableHeaderColumn>
            <TableHeaderColumn> {''} </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {groupFriends.map(x => (
            <TableRow>
              <TableRowColumn>{x}</TableRowColumn>
              <TableRowColumn> <TextField ref={y => { moneyRefs.push(y); }} /> </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="debt-list">{
        debtList.map(x => (
          <div className={adddebt.debtTable}>
            <div className={adddebt.debtTitle}> Title:{x.debtName} </div>
            <div className={adddebt.debtCreditor}> creditor: {x.creditor} </div>
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>people</TableHeaderColumn>
                  <TableHeaderColumn>money</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {x.debtorList.map(y => (
                  <TableRow>
                    <TableRowColumn>{y.debtor}</TableRowColumn>
                    <TableRowColumn>{y.money}</TableRowColumn>
                  </TableRow>)
                )}
              </TableBody>
            </Table>
          </div>
        ))
      }</div>
    </div>
   );
};

DebtList.propTypes = {
  dispatch: React.PropTypes.func,
  debtList: React.PropTypes.array,
  repayList: React.PropTypes.array,
  groupFriends: React.PropTypes.array,
  username: React.PropTypes.string,
  groupName: React.PropTypes.string,
};

export default DebtList;
