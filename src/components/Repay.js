import React, { Component } from 'react';

export default class Repay extends Component {
  componentWillMount() {
    this.props.fetchGetRepayList(this.props.username);
  }

  mapToDebtors(item) {
    return (
      <li key={item.debtor}>
        {item.debtor} {item.money}
        <button> clear </button>
      </li>
    );
  }

  mapToList(item) {
    return (
      <li key={item.groupName}> {item.groupName}
        <ul>
          {item.debtorList.map(this.mapToDebtors)}
        </ul>
      </li>
    );
  }

  render() {
    const { repayList } = this.props;
    return (
      <div>
        <h2> Repay Interface </h2>
        {repayList.map(this.mapToList.bind(this))}
      </div>
    );
  }
}

Repay.propTypes = {
  username: React.PropTypes.string,
  repayList: React.PropTypes.array,
  fetchGetRepayList: React.PropTypes.func,
};
