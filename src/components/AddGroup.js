import React from 'react';
import { fetchAddGroup, errorAddGroup } from '../actions/groupList';
import { addGroupFriend,
         removeGroupFriend,
         resetGroupFriends,
         errorGroupFriend } from '../actions/groupFriends';
import { RaisedButton, TextField } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import addgroupcss from './AddGroup.css';
import appcss from './App.css';

const handleCheck = (groupFriends, username) => {
  const list = groupFriends.filter(y => (y === username));
  return !(list.length === 0);
};

const AddGroup = ({ dispatch, groupFriends, username, friendList, groupList, err }) => {
  let groupName;
  let friendName;
  return (
    <Col className={addgroupcss.mainblock}>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!groupName) { return; }
          if (groupList.filter(x => x === groupName).length !== 0) {
            dispatch(errorAddGroup(`${groupName} already exists!`));
            return;
          }
          dispatch(fetchAddGroup(username, groupName, [...groupFriends, username]));
          dispatch(resetGroupFriends());
          groupName = '';
        }}
      >
        <Row center="xs" center="sm" center="md" center="lg">
          <RaisedButton type="submit" > Create Group </RaisedButton> <br />
        </Row>
        <Row>
          GroupName: <TextField
            onChange={event => { groupName = event.target.value; }}
            errorText={err[1]}
          />
        </Row>
      </form>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!friendName) { return; }
          if (friendList.filter(x => (x === friendName)).length === 0) {
            dispatch(errorGroupFriend(
              `${friendName} isn\'t your friend yet. Invite him/her to join with you  !`
            ));
            return;
          }
          dispatch(addGroupFriend(friendName));
          friendName = '';
        }}
      >
        <Row center="xs" center="sm" center="md" center="lg">
          Friend: <TextField
            onChange={event => { friendName = event.target.value; }}
            errorText={err[0]}
          />
          <RaisedButton type="submit"> Add Friend </RaisedButton>
        </Row>
      </form>
      <List>{friendList.map(x => (
        <ListItem
          id={appcss.listitem}
          leftCheckbox={
            <Checkbox
              checked={handleCheck(groupFriends, x)}
              onCheck={e => {
                if (e.target.checked) {
                  console.log(e.target.checked);
                  // console.log(checked);
                  console.log(groupFriends.filter(y => (y === x)));
                  dispatch(addGroupFriend(x));
                } else {
                  console.log(e.target.checked);
                  // console.log(checked);
                  console.log(groupFriends.filter(y => (y === x)));
                  dispatch(removeGroupFriend(x));
                }
              }}
            />
          }
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
  friendList: React.PropTypes.array,
  groupList: React.PropTypes.array,
  err: React.PropTypes.array,

};

export default AddGroup;
