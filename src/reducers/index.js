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

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    return app(undefined, action);
  }
  return app(state, action);
};

export default rootReducer;
