import { connect } from 'react-redux';
import Login from '../components/Login';

const mapStateToProps = (state) => ({
  err: state.login.err,
  isFetching: state.login.isFetching,
});

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
