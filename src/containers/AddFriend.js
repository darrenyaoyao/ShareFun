import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TextField } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Grid } from 'react-flexbox-grid';
import { fetchAddFriend } from '../actions/friendList';
import { grey50, orange500, blue500 } from 'material-ui/styles/colors';
import addfriendcss from './AddFriend.css';

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
            if (!input.getValue()) {
              return;
            }
            dispatch(fetchAddFriend(username, input.getValue()));
            input.getInputNode().value = '';
          }}
        >
          <TextField
            hintText="Add Friend"
            hintStyle={addfriendstyle.hintStyle}
            inputStyle={addfriendstyle.InputStyle}
            ref={x => { input = x; }}
          />
          <IconButton
            type="submit"
            primary
            className={addfriendcss.addfriend_button}
          >
            <ContentAdd />
          </IconButton>
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
