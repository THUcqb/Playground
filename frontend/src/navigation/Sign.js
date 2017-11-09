import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import Button from 'material-ui/Button';
import SignDialog from './SignDialog';
import { signin, signup, getInfoWithCookies } from '../utils/Auth';
import { instanceOf } from 'prop-types';

class SignButton extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

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

  componentDidMount() {
    const token = this.props.cookies.get('token');
    if (token)
    {
      getInfoWithCookies(token)
        .then((response) => {
          if (response.OK) {
            this.props.loggedIn(response.username);
          }
        });
    }
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
            this.props.loggedIn(username, true);
            this.props.cookies.set('token', SignInStatus.token, { path: '/', maxAge: 600});
          }
          else
            this.setState({textStatus: {disabled: false, usernameError: true, passwordError: true}});
        });
    }
  }

    /**
     * The sign up function.
     * @param username
     * @param password
     * @param phonenumber
     * @param email
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
          this.setState({textStatus: {disabled: false, usernameError: true}});
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

export default withCookies(SignButton);
