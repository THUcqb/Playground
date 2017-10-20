import React from 'react';
import Button from 'material-ui/Button';
import SignDialog from './SignDialog';
import { signin, signup } from '../utils/Auth';

class SignButton extends React.Component {
  /**
   * @constructor
   * @param props
   * @state open - If the dialog is open
   * @state textStatus - If the textField in the dialog is currently busy or not.
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isSignUp: false,
      textStatus: {
        disabled: false,
        usernameError: false,
        passwordError: false,
      }
    };
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  /**
   * The sign in function.
   * @param username
   * @param password
   */
  handleRequestSignIn(username, password) {
    if (this.state.isSignUp)
    {
      this.setState({isSignUp: false});
    }
    else
    {
      this.setState({textStatus: {disabled: true}});
      signin(username, password)
        .then(SignInStatus => {
          if (SignInStatus.OK)
          {
            this.setState({open: false});
            this.props.loggedIn(username);
          }
          else
            this.setState({textStatus: {disabled: false, usernameError: true, passwordError: true}});
        });
    }
  }

  /**
   * The sign up function.
   */
  handleRequestSignUp(username, password, phonenumber, email) {
    if (!this.state.isSignUp) {
      this.setState({isSignUp: true});
    }
    else
    {
      this.setState({textStatus: {disabled: true}});
      signup(username, password, phonenumber, email)
        .then(status => {
          if (status.OK)
            this.setState({isSignUp: false});
          this.setState({textStatus: {disabled: false}});
        })
    }
  }

  render() {
    return (
      <div>
        <Button raised color="primary" onClick={() => this.handleClickOpen()}>Sign in</Button>
        <SignDialog
          open={this.state.open}
          isSignUp={this.state.isSignUp}
          textStatus={this.state.textStatus}
          onRequestClose={() => this.handleRequestClose()}
          onRequestSignIn={(username, password) => this.handleRequestSignIn(username, password)}
          onRequestSignUp={(username, password, phonenumber, email) => this.handleRequestSignUp(username, password, phonenumber, email)}
        />
      </div>
    )
  }
}

export default SignButton;
