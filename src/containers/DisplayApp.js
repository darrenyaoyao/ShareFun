import { connect } from 'react-redux'
import { setDisplay } from '../actions/index'
import { addFriend } from '../actions/friendList'
import { fetchGetGroupList } from '../actions/groupList'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    friendList: state.friendList,
		groupList: state.groupList.list,
	  display: state.display,
	  username: state.login.username	
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
		clickFList: () => {
		  dispatch(setDisplay('friendList'));
		},
		clickGList: () => {
		  dispatch(setDisplay('groupList'));
		},	
    addFriend: (target) => {
		  dispatch(addFriend(target));
		},
		fetchGetGroupList: (username) => {
		  dispatch(fetchGetGroupList(username));
		}
	}
}

const DisplayApp = connect(
  mapStateToProps,
	mapDispatchToProps
)(App)

export default DisplayApp
