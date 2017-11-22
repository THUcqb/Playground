import React from 'react';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch'
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = i => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

/**
 * The sign in/up pop up dialog.
 */
class SignDialog extends React.Component
{
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        verificationCode: '',
        email: '',
        oldPassword: '',
        newPassword: '',
    };

    handleChange = name => event =>
    {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleEnterKeyPress = (ev) =>
    {
        if (ev.key === 'Enter')
        {
            this.props.onRequestSignIn(this.state.username, this.state.password);
            ev.preventDefault();
        }
    };

    render()
    {
        const {classes} = this.props;

        const usernameType = (
            <form>
                <TextField className={classes.username}
                           ref="usernameField"
                           id="username"
                           label="Username"
                           margin="dense"
                           fullWidth
                           autoFocus
                           value={this.state.username}
                           onChange={this.handleChange('username')}
                           disabled={this.props.textStatus.disabled}
                           error={this.props.textStatus.usernameError}
                           onKeyPress={this.handleEnterKeyPress}
                />
                <TextField className={classes.password}
                           ref="passwordField"
                           id="password"
                           label="Password"
                           margin="dense"
                           fullWidth
                           type="password"
                           autoComplete="current-password"
                           value={this.state.password}
                           onChange={this.handleChange('password')}
                           disabled={this.props.textStatus.disabled}
                           error={this.props.textStatus.passwordError}
                           onKeyPress={this.handleEnterKeyPress}
                />
            </form>
        );

        const phoneNumberType = (
            <form>
                <TextField className={classes.phoneNumber}
                           ref="phoneNumberField"
                           id="phoneNumber"
                           label="Phone number"
                           margin="dense"
                           fullWidth
                           autoFocus
                           value={this.state.phoneNumber}
                           onChange={this.handleChange('phoneNumber')}
                           disabled={this.props.textStatus.disabled}
                           error={this.props.textStatus.phoneNumberError}
                           onKeyPress={this.handleEnterKeyPress}
                />
                <div>
                    <TextField className={classes.verificationCode}
                               ref="verificationCodeField"
                               id="verificationCode"
                               label="Verification code"
                               margin="dense"
                               type="verificationCode"
                               autoComplete=""
                               value={this.state.verificationCode}
                               onChange={this.handleChange('verificationCode')}
                               disabled={this.props.textStatus.disabled}
                               error={this.props.textStatus.verificationCodeError}
                               onKeyPress={this.handleEnterKeyPress}
                    />
                    <Button
                        raised color="primary"
                        className={classes.button}
                        align="right"
                        onClick={() => this.props.onRequestSendSMS(this.state.phoneNumber)}
                        disabled={this.props.sendButtonState}
                    >
                        SEND
                    </Button>
                </div>
            </form>
        );

        let signInType = null;
        let message = "";
        const option = "Switch to change mode.";
        if (this.props.SMS)
        {
            signInType = phoneNumberType;
            message = "Please type in your phone number.";
        }
        else
        {
            signInType = usernameType;
            message = "Please type in your username and password.";
        }


        const signInForm = (
            <form className={classes.container} autoComplete="off">
                {signInType}
            </form>
        );

        const signUpForm = (
            <form className={classes.container} autoComplete="off">
                <TextField className={classes.username}
                           ref="usernameField"
                           id="username"
                           label="Username"
                           margin="dense"
                           fullWidth
                           autoFocus
                           value={this.state.username}
                           onChange={this.handleChange('username')}
                           disabled={this.props.textStatus.disabled}
                           error={this.props.textStatus.usernameError}
                />
                <TextField className={classes.password}
                           ref="passwordField"
                           id="password"
                           label="Password"
                           margin="dense"
                           fullWidth
                           type="password"
                           value={this.state.password}
                           onChange={this.handleChange('password')}
                           disabled={this.props.textStatus.disabled}
                />
                <TextField className={classes.password}
                           ref="confirmPasswordField"
                           id="confirmPassword"
                           label="Confirm password"
                           margin="dense"
                           fullWidth
                           type="password"
                           value={this.state.confirmPassword}
                           onChange={this.handleChange('confirmPassword')}
                           disabled={this.props.textStatus.disabled}
                />
                <TextField className={classes.phoneNumber}
                           ref="phoneNumberField"
                           id="phoneNumber"
                           label="Phone"
                           margin="dense"
                           fullWidth
                           type="phone"
                           value={this.state.phoneNumber}
                           onChange={this.handleChange('phoneNumber')}
                           disabled={this.props.textStatus.disabled}
                />
                <TextField className={classes.email}
                           ref="email"
                           id="email"
                           label="Email"
                           margin="dense"
                           fullWidth
                           type="email"
                           value={this.state.email}
                           onChange={this.handleChange('email')}
                           disabled={this.props.textStatus.disabled}
                />
            </form>
        );

        const changePasswordForm = (
            <form className={classes.container} autoComplete="off">
                <TextField
                    id="oldPassword"
                    label="oldPassword"
                    margin="dense"
                    type="password"
                    fullWidth
                    autoFocus
                    value={this.state.oldPassword}
                    onChange={this.handleChange('oldPassword')}
                    onKeyPress={this.handleEnterKeyPress}
                    disabled={this.props.textStatus.disabled}
                    error={this.props.textStatus.usernameError}
                />
                <TextField
                    id="newPassword"
                    label="newPassword"
                    margin="dense"
                    fullWidth
                    type="password"
                    autoComplete="current-password"
                    value={this.state.newPassword}
                    onChange={this.handleChange('newPassword')}
                    onKeyPress={this.handleEnterKeyPress}
                    disabled={this.props.textStatus.disabled}
                    error={this.props.textStatus.usernameError}
                />
            </form>
        );

        let signForm = null;
        if (this.props.signingState === 'signup')
            signForm = signUpForm;
        else if (this.props.signingState === 'signin')
            signForm = signInForm;
        else
            signForm = changePasswordForm;

        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                <DialogTitle>Sign in</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                        control={
                            <Switch
                                value={this.state.SMS}
                                onChange={(event, checked) => this.props.onRequestSwitch(checked)}
                                label="Sign in with SMS"
                            />
                        }
                        label={option}
                    />
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                    {signForm}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={() => this.props.onRequestSignUp(
                        this.state.username, this.state.password, this.state.phoneNumber, this.state.email)}
                            raised color="primary">
                        Sign up
                    </Button>
                    <Button onClick={() => this.props.onRequestSignIn(
                        this.state.username, this.state.password, this.state.phoneNumber, this.state.verificationCode)} color="primary">
                        Sign in
                    </Button>
                    <Button onClick={() => this.props.onRequestChangePassword(
                        this.state.oldPassword, this.state.newPassword)} color="primary">
                        Change Password
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SignDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(SignDialog);
