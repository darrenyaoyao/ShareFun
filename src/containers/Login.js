import React from 'react'
import { connect } from 'react-redux'
//import { login } from '../actions'
import { fetchLogin } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
	  err: state.login.err,
		isFetching: state.login.isFetching
	}
}

let Login = ({dispatch, err}) => {
  let username,password;
	return (
	  <div>
		  <h1> ShareFun </h1>
		  <form onSubmit={ e=>{
			  e.preventDefault();
				if(!username.value.trim() || !password.value.trim()){
				  return;
				}
        dispatch(fetchLogin(username.value, password.value));
				username.value='';
				password.value='';
			}}>
			  username: <input ref={node=>{username=node}}/> <br/>
				password : <input ref={node=>{password=node}}/> <br/>
			  <button type="submit">
			    login
			  </button>
			</form>
			<h3> { (err?'invalid user':'') } </h3>
    </div>		
	)
} 

Login = connect(mapStateToProps)(Login)

export default Login
