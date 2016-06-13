import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import './App.css'
import AddFriend from '../containers/AddFriend'

export default class App extends Component {
	mapToFriend(friendObj){
	  return (
		  <li key={friendObj} className="list-group-item indent1"> 
			  <button className="btn btn-link">
			    {friendObj} 
			  </button>
		  </li>
		)
	}
	mapToGroup(groupObj){
	  return (
			<li key={groupObj.groupName} className="list-group-item indent2"> 
			  <Link to={"/app/group/"+groupObj.groupName}>
				  {groupObj.groupName}
			 	</Link>
			</li>
		)
	}
	componentWillMount(){
    this.props.fetchGetGroupList(this.props.username);	
	}
  render(){
		const { username, friendList, groupList, 
			      clickFList, clickGList, display, 
						addFriend  } = this.props;
	  return (
		  <div>
			   <nav className="navbar navbar-inverse"> 
				   <div className="navbar-left"><AddFriend/></div>
					<Link className="navbar-brand navbar-right" to="/Login"> Log out </Link>
					<a className="navbar-brand navbar-right"> {username}  </a>
				</nav> 
				<ul className="list-group col-md-2">
				   <li className="list-group-item"> 
					   <button className='btn btn-link' onClick={clickFList}> friendList </button>
					</li>
					{friendList.map(this.mapToFriend)}
					<li className="list-group-item"> 
					   <button className='btn btn-link' onClick={clickGList}> groupList  </button>
					</li>
					{groupList.map(this.mapToGroup)}
				</ul>
				{this.props.children}
			</div>
	  );
	}
}
