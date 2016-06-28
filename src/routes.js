import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Login from './containers/Login';
import DisplayApp from './containers/DisplayApp';
import Group from './components/Group';
import AddGroup from './containers/AddGroup';
import Repay from './containers/Repay';

export default (
  <Route path="/">
    <IndexRedirect to="/login" />
    <Route path="/login" component={Login} />
    <Route path="/app" component={DisplayApp}>
      <Route path="/app/addGroup" component={AddGroup} />
      <Route path="/app/group/:groupName" component={Group} />
      <Route path="/app/repay" component={Repay} />
    </Route>
  </Route>
);
