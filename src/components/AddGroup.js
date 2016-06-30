import React from 'react';
import { fetchAddGroup, errorAddGroup } from '../actions/groupList';
import { addGroupFriend,
         removeGroupFriend,
         resetGroupFriends,
         errorGroupFriend } from '../actions/groupFriends';
import { RaisedButton, TextField } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add-box';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
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
          if (!groupName.getValue()) {
            dispatch(errorAddGroup('Group name is needed.'));
            return;
          }
          if (groupList.filter(x => x === groupName.getValue()).length !== 0) {
            dispatch(errorAddGroup(`${groupName.getValue()} already exists!`));
            return;
          }
          if (groupFriends.length < 1) {
            dispatch(errorAddGroup('Join some friends in this group!'));
            return;
          }
          dispatch(fetchAddGroup(username, groupName.getValue(), [...groupFriends, username]));
          dispatch(resetGroupFriends());
          groupName.getInputNode().value = '';
        }}
      >
        <Row center="xs" center="sm" center="md" center="lg">
          <RaisedButton
            type="submit"
            primary
            icon={<GroupAdd />}
            style={addgroupcss.addGroupButton}
          >
          {'Create Group '}
          </RaisedButton> <br />
        </Row>
        <Row center="xs" center="sm" center="md" center="lg">
          <TextField
            hintText="Group Name"
            ref={(x) => { groupName = x; }}
            errorText={err[1]}
          />
        </Row>
      </form>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!friendName.getValue()) { return; }
          if (friendList.filter(x => (x === friendName.getValue())).length === 0) {
            dispatch(errorGroupFriend(
              `${friendName.getValue()} isn\'t your friend yet. Invite him/her to join with you  !`
            ));
            return;
          }
          dispatch(addGroupFriend(friendName.getValue()));
          friendName.getInputNode().value = '';
        }}
      >
        <Row center="xs" center="sm" center="md" center="lg">
          <TextField
            hintText="Friend Name"
            ref={(x) => { friendName = x; }}
            errorText={err[0]}
          />
          <IconButton
            type="submit"
            primary
            mini
            style={{ marginLeft: -50 }}
          >
            <ContentAdd />
          </IconButton>
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
                  dispatch(addGroupFriend(x));
                } else {
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
