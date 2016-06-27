import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { RaisedButton, TextField } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { fetchAddFriend } from '../actions/friendList';
import { grey50, orange500, blue500 } from 'material-ui/styles/colors';

const mapStateToProps = (state) => ({
  username: state.login.username,
});

const AddFriend = ({ dispatch, username }) => {
  let input;
  const addfriendstyle = {
    hintStyle: {
      color: grey50,
    },
    InputStyle: {
      color: grey50,
    },
    floatingLabelStyle: {
      color: orange500,
    },
    floatingLabelFocusStyle: {
      color: blue500,
    },
  };
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Grid>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input) {
              return;
            }
            dispatch(fetchAddFriend(username, input));
            input = '';
          }}
        >
          <TextField
            hintText="Friend Name"
            hintStyle={addfriendstyle.hintStyle}
            inputStyle={addfriendstyle.InputStyle}
            onChange={event => { input = event.target.value; }}
          />
          <RaisedButton type="submit">
            Add Friend
          </RaisedButton>
        </form>
      </Grid>
    </MuiThemeProvider>
  );
};

AddFriend.propTypes = {
  dispatch: React.PropTypes.func,
  username: React.PropTypes.string,
};

const AddFriendContainer = connect(mapStateToProps)(AddFriend);

export default AddFriendContainer;
