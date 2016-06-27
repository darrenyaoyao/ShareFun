import React from 'react';
import { fetchAddGroup } from '../actions/groupList';
import { addGroupFriend, resetGroupFriends } from '../actions/groupFriends';
import { RaisedButton, TextField } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import addgroupcss from './AddGroup.css';
import appcss from './App.css';

const AddGroup = ({ dispatch, groupFriends, username }) => {
  let groupName;
  let friendName;
  return (
    <Col className={addgroupcss.mainblock}>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!groupName) { return; }
          dispatch(fetchAddGroup(username, groupName, [...groupFriends, username]));
          dispatch(resetGroupFriends());
          groupName = '';
        }}
      >
        <Row center="xs" center="sm" center="md" center="lg">
          <RaisedButton type="submit" > Create Group </RaisedButton> <br />
        </Row>
        <Row>
          GroupName: <TextField onChange={event => { groupName = event.target.value; }} />
        </Row>
      </form>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!friendName) { return; }
          dispatch(addGroupFriend(friendName));
          friendName = '';
        }}
      >
        <Row center="xs" center="sm" center="md" center="lg">
          Friend: <TextField onChange={event => { friendName = event.target.value; }} />
          <RaisedButton type="submit"> Add Friend </RaisedButton>
        </Row>
      </form>
      <List>{groupFriends.map(x => (
        <ListItem
          id={appcss.listitem}
          leftIcon={<ActionGrade />}
        > {x} 
        </ListItem>
      ))}</List>
    </Col>
   );
};

AddGroup.propTypes = {
  dispatch: React.PropTypes.func,
  username: React.PropTypes.string,
  groupFriends: React.PropTypes.array,
};

export default AddGroup;
