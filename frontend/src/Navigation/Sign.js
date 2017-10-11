import React from 'react';
import Button from 'material-ui/Button';
import SignDialog from './SignDialog';
class SignButton extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => this.setState({open: true})

  handleRequestClose = () => this.setState({open: false})

  handleRequestSignIn() {
    alert('sign in');
  }

  handleRequestSignUp() {
    alert('sign in');
  }

  render() {
    return (
      <div>
        <Button raised color="primary" onClick={this.handleClickOpen}>Sign in</Button>
        <SignDialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          onRequestSignIn={this.handleRequestSignIn}
          onRequestSignUp={this.handleRequestSignUp}
        />
      </div>
    )
  }
}

export default SignButton;
