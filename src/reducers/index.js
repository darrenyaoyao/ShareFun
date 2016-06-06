import { combineReducers } from 'redux'
import display from './display'
import friendList from './friendList'
import login from './login'
import groupList from './groupList'
import groupFriends from './groupFriends'

const app = combineReducers({
  display,
	friendList,
	login,
	groupList,
	groupFriends
})

export default app
