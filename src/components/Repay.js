/* eslint react/jsx-no-bind: 0*/
import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { Table,
         TableHeader,
         TableBody,
         TableRow,
         TableRowColumn,
         TableHeaderColumn } from 'material-ui/Table';
import { Col } from 'react-flexbox-grid';
import { RaisedButton } from 'material-ui';

export default class Repay extends Component {
  componentWillMount() {
    this.props.fetchGetRepayList(this.props.username);
  }

  mapToDebtors(groupName, item) {
    const { addRepay, username } = this.props;
    return (
      <TableRow>
        <TableRowColumn> {item.debtor} </TableRowColumn>
        <TableRowColumn> {item.money} </TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            primary
            onMouseDown={addRepay.bind(null, username, groupName, item.debtor)}
          > Update </RaisedButton>
        </TableRowColumn>
      </TableRow>
    );
  }
  mapToList(item) {
    return (
      <List key={item.groupName}> {item.groupName}
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn> people </TableHeaderColumn>
              <TableHeaderColumn> money </TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {item.debtorList.map(this.mapToDebtors.bind(this, item.groupName))}
          </TableBody>
        </Table>
      </List>
    );
  }

  render() {
    const { repayList } = this.props;
    return (
      <Col md={6}>
        <h2> Repay Interface </h2>
        {repayList.map(this.mapToList.bind(this))}
      </Col>
    );
  }
}

Repay.propTypes = {
  username: React.PropTypes.string,
  repayList: React.PropTypes.array,
  fetchGetRepayList: React.PropTypes.func,
  addRepay: React.PropTypes.func,
};
