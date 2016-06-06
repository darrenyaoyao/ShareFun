import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'
import { push } from 'react-router-redux'

let Login = ({dispatch}) => {
  let username,password;
	return (
	  <div>
		  <h1> ShareFun </h1>
		  <form onSubmit={ e=>{
			  e.preventDefault();
				if(!username.value.trim() || !password.value.trim()){
				  return;
				}
        dispatch(login([
				 username.value, password.value		
				]))
				dispatch(push('/app/addGroup'))
				username.value='';
				password.value='';
			}}>
			  username: <input ref={node=>{username=node}}/> <br/>
				password : <input ref={node=>{password=node}}/> <br/>
			  <button type="submit">
			    login
			  </button>
			</form>
    </div>		
	)
} 

Login = connect()(Login)

export default Login
