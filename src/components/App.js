/* eslint react/jsx-no-bind: 0*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { FlatButton } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import Person from 'material-ui/svg-icons/social/person';
import Group from 'material-ui/svg-icons/social/group';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import appcss from './App.css';
import AddFriend from '../containers/AddFriend';

export default class App extends Component {
  componentWillMount() {
    this.props.fetchGetGroupList(this.props.username);
    this.props.fetchGetFriendList(this.props.username);
  }
  mapToFriend(friendObj) {
    return (
      <ListItem
        id={appcss.listitem}
        key={friendObj}
        primaryText={friendObj}
        leftIcon={<Person />}
      />
		);
  }
  mapToGroup(groupName) {
    const { username, clickGroup } = this.props;
    return (
      <ListItem
        id={appcss.listitem}
        key={groupName}
        primaryText={groupName}
        leftIcon={<Group />}
        onClick={clickGroup.bind(this, username, groupName)}
      />
    );
  }
  render() {
    const { username, friendList, groupList,
            clickRepay, clickAddGroup } = this.props;
    const buttonstyle = {
      margin: 12,
    };
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Grid>
          <Row className={appcss.Appheader}>
            <Col xs={6} sm={4} md={3} lg={3}>
              <AddFriend />
            </Col>
            <Col xs={0} sm={4} md={6} lg={6} />
            <Col xs={6} sm={4} md={3} lg={3}>
              <Link to="/Login">
                <FlatButton
                  style={buttonstyle}
                  backgroundColor="#FAFAFA"
                  hoverColor="#E0E0E0"
                  label="Log out"
                />
              </Link>
              <a> {username} </a>
            </Col>
          </Row>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3} className={appcss.side}>
              <List>
                <FlatButton onClick={clickAddGroup} label="addGroup" /> <br />
                <FlatButton onClick={clickRepay} label="Repayment" />
                <Subheader>FriendList</Subheader>
                  {friendList.map(this.mapToFriend.bind(this))}
                <Divider />
                <Subheader> GroupList </Subheader>
                  {groupList.map(this.mapToGroup.bind(this))}
              </List>
            </Col>
            {this.props.children}
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  username: React.PropTypes.string,
  friendList: React.PropTypes.array,
  groupList: React.PropTypes.array,
  clickFList: React.PropTypes.func,
  clickGroup: React.PropTypes.func,
  clickAddGroup: React.PropTypes.func,
  clickRepay: React.PropTypes.func,
  children: React.PropTypes.any,
  fetchGetGroupList: React.PropTypes.func,
  fetchGetFriendList: React.PropTypes.func,
};
