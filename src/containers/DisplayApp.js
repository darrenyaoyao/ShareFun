import { connect } from 'react-redux'
import { setDisplay, addFriend } from '../actions'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    friendList: state.friendList,
		groupList: state.groupList,
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
		}
	}
}

const DisplayApp = connect(
  mapStateToProps,
	mapDispatchToProps
)(App)

export default DisplayApp
