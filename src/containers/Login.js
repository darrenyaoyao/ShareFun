import React from 'react';
import { connect } from 'react-redux';
import { fetchLogin } from '../actions/login';

const mapStateToProps = (state) => ({
  err: state.login.err,
  isFetching: state.login.isFetching,
});

const Login = ({ dispatch, err }) => {
  let username;
  let	password;
  return (
    <div>
      <h1> ShareFun </h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!username.value.trim() || !password.value.trim()) {
            return;
          }
          dispatch(fetchLogin(username.value, password.value));
          username.value = '';
          password.value = '';
        }}
      >
        username: <input ref={node => { username = node; }} /> <br />
        password : <input ref={node => { password = node; }} /> <br />
        <button type="submit">
          login
        </button>
      </form>
      <h3> {(err ? 'invalid user' : '')} </h3>
    </div>
	);
};

Login.propTypes = {
  dispatch: React.PropTypes.func,
  err: React.PropTypes.bool,
};

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
