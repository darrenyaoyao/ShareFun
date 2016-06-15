import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import AddFriend from '../containers/AddFriend';

export default class App extends Component {
  componentWillMount() {
    this.props.fetchGetGroupList(this.props.username);
  }
  mapToFriend(friendObj) {
    return (
      <li key={friendObj} className="list-group-item indent1">
        <button className="btn btn-link">
          {friendObj}
        </button>
      </li>
		);
  }
  mapToGroup(groupObj) {
    return (
      <li key={groupObj.groupName} className="list-group-item indent2">
        <Link to={'/app/group/'.concat(groupObj.groupName)} >
          {groupObj.groupName}
        </Link>
      </li>
    );
  }
  render() {
    const { username, friendList, groupList,
            clickFList, clickGList } = this.props;
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="navbar-left"> <AddFriend /> </div>
          <Link className="navbar-brand navbar-right" to="/Login"> Log out </Link>
          <a className="navbar-brand navbar-right"> {username} </a>
        </nav>
        <ul className="list-group col-md-2">
          <li className="list-group-item">
            <button className="btn btn-link" onClick={clickFList}> friendList </button>
          </li>
					{friendList.map(this.mapToFriend)}
          <li className="list-group-item">
            <button className="btn btn-link" onClick={clickGList}> groupList </button>
          </li>
					{groupList.map(this.mapToGroup)}
        </ul>
				{this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  username: React.PropTypes.string,
  friendList: React.PropTypes.array,
  groupList: React.PropTypes.array,
  clickFList: React.PropTypes.func,
  clickGList: React.PropTypes.func,
  children: React.PropTypes.any,
  fetchGetGroupList: React.PropTypes.func,
};
