import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import Button from 'material-ui/Button';
import SignDialog from './SignDialog';
import { signin, signup, changePassword, getInfoWithCookies } from '../utils/Auth';
import { instanceOf } from 'prop-types';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
    avatar: {
        background: 'linear-gradient(45deg, #03A9F4 30%, #3F51B5 90%)',
    }
});

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
            signingState: 'signin',
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
        if (this.state.signingState !== 'signin')
        {
            this.setState({signingState: 'signin'});
        }
        else
        {
            this.setState({textStatus: {disabled: true}});
            signin(username, password)
                .then(SignInStatus => {
                    if (SignInStatus.OK) {
                        this.setState({open: false});
                        this.props.loggedIn(username, true);
                        this.props.cookies.set('token', SignInStatus.token, {path: '/', maxAge: 1296000});
                    }
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
        if (this.state.signingState !== 'signup') {
            this.setState({signingState: 'signup'});
        }
        else
        {
            this.setState({textStatus: {disabled: true}});
            signup(username, password, phonenumber, email)
                .then(status => {
                    if (status.OK)
                        this.setState({signingState: 'signin'});
                    this.setState({textStatus: {disabled: false, usernameError: true}});
                })
        }
    }

    /**
     * When the user clicks change password
     * @param oldPassword
     * @param newPassword
     */
    handleRequestChangePassword(oldPassword, newPassword) {
        if (this.state.signingState !== 'changepassword')
        {
            this.setState({signingState: 'changepassword'});
        }
        else
        {
            this.setState({textStatus: {disabled: true}});
            changePassword(oldPassword, newPassword)
                .then(SignInStatus => {
                    if (SignInStatus.OK) {
                        this.setState({open: false});
                    }
                    else {
                        this.setState({textStatus: {disabled: false, usernameError: true, passwordError: true}});
                    }
                });
        }
    }

    render() {

        const { classes } = this.props;

        let userOp = null;

        if (this.props.isloggedIn)
            userOp = (
                <Avatar className={classes.avatar} onClick={() => this.handleClickOpen()}>
                    {this.props.username[0]}
                </Avatar>
            );
        else
            userOp = (
                <Button raised color="primary" onClick={() => this.handleClickOpen()}>Sign in</Button>
            );

        return (
            <div>
                {userOp}
                <SignDialog
                    open={this.state.open}
                    signingState={this.state.signingState}
                    textStatus={this.state.textStatus}
                    onRequestClose={() => this.handleRequestClose()}
                    onRequestSignIn={(username, password) => this.handleRequestSignIn(username, password)}
                    onRequestSignUp={(username, password, phonenumber, email) => this.handleRequestSignUp(username, password, phonenumber, email)}
                    onRequestChangePassword={(oldPasword, newPassword) => this.handleRequestChangePassword(oldPasword, newPassword)}
                />
            </div>
        )
    }
}

SignButton.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(style, { withTheme: true })(withCookies(SignButton));
