import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class MessageBar extends React.Component {
    constructor(props) {
        super(props);
        MessageBar.singleton = this;
    }

    state = {
        open: false,
        msg: '',
    };

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    static show(msg) {
        MessageBar.singleton.setState({ open: true, msg: msg });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={1000}
                    onRequestClose={this.handleRequestClose}
                    message={<span id="message-id">{this.state.msg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="accent"
                            className={classes.close}
                            onClick={this.handleRequestClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

MessageBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageBar);
