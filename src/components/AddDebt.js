import React from 'react';
import { addDebtor, resetNewDebt } from '../actions/newDebt';
import { fetchAddDebt } from '../actions/debtList';
import { RaisedButton, TextField } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import adddebt from './AddDebt.css';

const DebtList = ({ dispatch, debtList, newDebt, username }) => {
  let debtName;
  let debtor;
  let money;
  return (
    <Col className={adddebt.displaydebt} >
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(fetchAddDebt('testName', 'testGroup', {
            crditor: username,
            debtName: debtName.value,
            debtorList: newDebt,
          }));
          debtName = '';
          dispatch(resetNewDebt());
        }}
      >
        DebtName: <TextField onChange={event => { debtName = event.target.value; }} />
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
            <td> <TextField onChange={event => { debtor = event.target.value; }} /> </td>
            <td> <TextField onChange={event => { money = event.target.value; }} /> </td>
            <RaisedButton
              onClick={e => {
                e.preventDefault();
                dispatch(addDebtor({
                  debtor: debtor,
                  money: money,
                }));
                debtor = '';
                money = '';
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
            <h3> {x.debtName} </h3>
            <h4> {x.creditor} </h4>
            <ul>{x.debtorList.map(y => (
              <li> {y.debtor.concat(' ').concat(y.money)} </li>)
                  )}
            </ul>
          </div>
        ))
      }</div>
    </Col>
   );
};

DebtList.propTypes = {
  dispatch: React.PropTypes.func,
  debtList: React.PropTypes.array,
  groupFriends: React.PropTypes.array,
  newDebt: React.PropTypes.array,
  username: React.PropTypes.string,
};

export default DebtList;
