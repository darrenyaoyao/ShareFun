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
  mapToGroup(groupName) {
    const { username, clickGroup } = this.props;
    return (
      <li key={groupName} className="list-group-item indent2">
        <button
          onClick={clickGroup.bind(this, username, groupName)}
          className="btn btn-link"
        >
          {groupName}
        </button>
      </li>
    );
  }
  render() {
    const { username, friendList, groupList,
            clickFList } = this.props;
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
            <button className="btn btn-link"> groupList </button>
          </li>
					{groupList.map(this.mapToGroup.bind(this))}
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
  clickGroup: React.PropTypes.func,
  children: React.PropTypes.any,
  fetchGetGroupList: React.PropTypes.func,
};
