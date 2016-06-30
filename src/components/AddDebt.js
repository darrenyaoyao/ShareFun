import React from 'react';
import { fetchAddDebt, fetchGetGroupRepay, errorAddDebt } from '../actions/debtList';
import { RaisedButton, TextField } from 'material-ui';
import { Table, TableBody, TableHeader,
         TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import adddebt from './AddDebt.css';

const DebtList = ({ dispatch, debtList,
                    username, groupName,
                    repayList, groupFriends, errorMessage }) => {
  let debtName;
  const moneyRefs = [];
  return (
    <div>
      <div>
        <RaisedButton
          primary
          onMouseDown={() => { dispatch(fetchGetGroupRepay(username, groupName)); }}
        > settle debt </RaisedButton>
      </div>
      <div hidden={repayList.length === 0}>
        <h3 className={adddebt.fontStyle}> Summary of Debts </h3>
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
              <TableRow selectable={false}>
                <TableRowColumn>{x.debtor}</TableRowColumn>
                <TableRowColumn>{x.money}</TableRowColumn>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
        <br />
      </div>

      <TextField
        hintText="title of debt"
        floatingLabelText="title of debt"
        errorText={errorMessage}
        ref={x => { debtName = x; }}
      />
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn> Name </TableHeaderColumn>
            <TableHeaderColumn> Money </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {groupFriends.map(x => (
            <TableRow selectable={false}>
              <TableRowColumn>{x}</TableRowColumn>
              <TableRowColumn>
                <TextField
                  ref={y => { moneyRefs.push(y); }}
                  onBlur={e => {
                    e.preventDefault();
                  }}
                />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <form
        onSubmit={e => {
          e.preventDefault();
          const newDebt = [];
          const len = groupFriends.length;
          if (!debtName.getValue()) {
            dispatch(errorAddDebt('Debt name is needed!'));
            return;
          }
          for (let i = 0; i < len; i++) {
            if (moneyRefs[i].getValue()) {
              if (!isFinite(moneyRefs[i].getValue())) {
                moneyRefs[i].getInputNode().value = '';
                dispatch(errorAddDebt('Money should be integer!'));
                return;
              }
              newDebt.push({
                debtor: groupFriends[i],
                money: 1.0 * moneyRefs[i].getValue(),
              });
              moneyRefs[i].getInputNode().value = '';
            }
          }
          if (newDebt.length === 0) {
            dispatch(errorAddDebt('Can not create an empty debt.'));
            return;
          }
          const now = new Date();
          dispatch(fetchAddDebt(username, groupName, {
            creditor: username,
            createdAt:
             `${now.getFullYear()}-${(now.getMonth()>9)?now.getMonth()+1:'0'+(now.getMonth()+1)}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`,
            debtName: debtName.getValue(),
            debtorList: newDebt,
          }));
          debtName.getInputNode().value = '';
        }}
      >
        <RaisedButton primary type="submit"> add debt </RaisedButton>
      </form>

      <div className="debt-list">{
        debtList.map(x => (
          <div className={adddebt.debtTable}>
            <div className={adddebt.debtTitle}> {x.debtName} </div>
            <div className={adddebt.debtCreditor}> creditor: {x.creditor} </div>
            <div className={adddebt.debtCreateAt}>
              {x.createdAt.slice(0, 10)} {x.createdAt.slice(11, 16)}
            </div>
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>people</TableHeaderColumn>
                  <TableHeaderColumn>money</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {x.debtorList.map(y => (
                  <TableRow selectable={false}>
                    <TableRowColumn>{y.debtor}</TableRowColumn>
                    <TableRowColumn>{y.money}</TableRowColumn>
                  </TableRow>)
                )}
              </TableBody>
            </Table>
          </div>
        )).reverse()
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
  errorMessage: React.PropTypes.string,
};

export default DebtList;
