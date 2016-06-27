import { combineReducers } from 'redux';
import display from './display';
import friendList from './friendList';
import login from './login';
import groupList from './groupList';
import groupFriends from './groupFriends';
import debtList from './debtList';
import newDebt from './newDebt';
import repayList from './repayList';

const app = combineReducers({
  display,
  friendList,
  login,
  groupList,
  groupFriends,
  debtList,
  newDebt,
  repayList,
});

export default app;
