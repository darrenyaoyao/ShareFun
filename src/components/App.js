import React, { Component } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { FlatButton } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import appcss from './App.css';
import AddFriend from '../containers/AddFriend';

export default class App extends Component {
  componentWillMount() {
    this.props.fetchGetGroupList(this.props.username);
  }
  mapToFriend(friendObj) {
    return (
      /*
      <li key={friendObj} className="list-group-item indent1">
        <button className="btn btn-link">
          {friendObj}
        </button>
      </li>*/
      <ListItem
        id={appcss.listitem}
        key={friendObj}
        primaryText={friendObj}
        leftIcon={<ActionGrade />}
      />
		);
  }
  mapToGroup(groupName) {
    const { username, clickGroup } = this.props;
    return (
      /*
      <li key={groupName} className="list-group-item indent2">
        <button
          onClick={clickGroup.bind(this, username, groupName)}
          className="btn btn-link"
        >
          {groupName}
        </button>
      </li>*/
      <ListItem
        id={appcss.listitem}
        key={groupName}
        primaryText={groupName}
        leftIcon={<ActionGrade />}
        onClick={clickGroup.bind(this, username, groupName)}
      />
    );
  }
  render() {
    const { username, friendList, groupList,
            clickFList } = this.props;
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
                <Subheader onClick={clickFList}>FriendList</Subheader>
                  {friendList.map(this.mapToFriend)}
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
  children: React.PropTypes.any,
  fetchGetGroupList: React.PropTypes.func,
};
