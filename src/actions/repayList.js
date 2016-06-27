/* eslint no-console: 0*/
import fetch from 'isomorphic-fetch';

export const requestAddRepay = () => ({
  type: 'REQUEST_ADD_REPAY',
});

export const receiveAddRepay = (repayList) => ({
  type: 'RECEIVE_ADD_REPAY',
  payload: { repayList },
});

export const fetchAddRepay = (username, groupName, debtor) => (
  dispatch => {
    dispatch(requestAddRepay());
    return fetch('/api/addRepay', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        groupName,
        debtor,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch(receiveAddRepay(json.repayList));
        }
      });
  }
);

export const requestGetRepayList = () => ({
  type: 'REQUEST_GET_REPAY_LIST',
});

export const receiveGetRepayList = (repayList) => ({
  type: 'RECEIVE_GET_REPAY_LIST',
  payload: repayList,
});

export const fetchGetRepayList = (username) => (
  dispatch => {
    dispatch(requestGetRepayList());
    return fetch('/api/getRepayList/'.concat(username))
      .then(res => res.json())
      .then(json => {
        dispatch(receiveGetRepayList(json.repayList));
      })
      .catch(err => {
        console.log(err);
      });
  }
);
