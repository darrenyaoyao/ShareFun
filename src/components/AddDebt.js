import React from 'react';
import { addDebtor, resetNewDebt } from '../actions/newDebt';
import { fetchAddDebt, fetchGetGroupRepay } from '../actions/debtList';
import { RaisedButton, TextField } from 'material-ui';
import { Table, TableBody, TableHeader,
         TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import adddebt from './AddDebt.css';

const DebtList = ({ dispatch, debtList,
                    newDebt, username,
                    groupName, repayList }) => {
  let debtName;
  let debtor;
  let money;
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
          dispatch(fetchAddDebt(username, groupName, {
            crditor: username,
            debtName: debtName.getValue(),
            debtorList: newDebt,
          }));
          debtName.getInputNode().value = '';
          dispatch(resetNewDebt());
        }}
      >
        DebtName: <TextField ref={x => { debtName = x; }} />
        <RaisedButton type="submit"> add debt </RaisedButton>
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
            <td> <TextField ref={x => { debtor = x; }} /> </td>
            <td> <TextField ref={x => { money = x; }} /> </td>
            <RaisedButton
              onClick={e => {
                e.preventDefault();
                dispatch(addDebtor({
                  debtor: debtor.getValue(),
                  money: money.getValue(),
                }));
                debtor.getInputNode().value = '';
                money.getInputNode().value = '';
              }}
            > add
            </RaisedButton>
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
            <span className={adddebt.fontStyle}> Title:{x.debtName} </span>
            <span> creditor: {x.creditor} </span>
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
  newDebt: React.PropTypes.array,
  username: React.PropTypes.string,
  groupName: React.PropTypes.string,
};

export default DebtList;
