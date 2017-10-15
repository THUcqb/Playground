import React from 'react';
import Button from 'material-ui/Button';
import SignDialog from './SignDialog';
import { login } from '../utils/Auth'

class SignButton extends React.Component {
  state = {
    open: false,
    textStatus: {
      disabled: false,
      usernameError: false,
      passwordError: false,
    }
  };

  handleClickOpen = () => this.setState({open: true});

  handleRequestClose = () => this.setState({open: false});

  handleRequestSignIn(username, password) {
    this.setState({textStatus: {disabled: true}});
    login(username, password).then(responseData => {
      if (responseData.status === 'OK')
        this.setState({open: false});
      if (responseData.status === 'UserNotExist')
        this.setState({textStatus: {disabled: false, usernameError: true}});
      if (responseData.status === 'IncorrectPassword')
        this.setState({textStatus: {disabled: false, passwordError: true}});
    });
  }

  handleRequestSignUp() {
    alert('sign up');
  }

  render() {
    return (
      <div>
        <Button raised color="primary" onClick={this.handleClickOpen}>Sign in</Button>
        <SignDialog
          open={this.state.open}
          textStatus={this.state.textStatus}
          onRequestClose={this.handleRequestClose}
          onRequestSignIn={this.handleRequestSignIn.bind(this)}
          onRequestSignUp={this.handleRequestSignUp.bind(this)}
        />
      </div>
    )
  }
}

export default SignButton;
