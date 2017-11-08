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

class HintBar extends React.Component {
    constructor(props) {
        super(props);
        HintBar.sing = this;
    }

    state = {
        open: false,
        type: null,
    };

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    static show(type) {
        HintBar.sing.setState({ open: true, type: type});
    }

    render() {
        const { classes } = this.props;

        const msg = {
            wall: 'You should avoid these blocks to get the coins.',
            coin: 'Take these coins to get stars.',
            role: 'This is you!',
            removeRole: 'You are not allowed to remove the role.',
        };

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
                    message={<span id="message-id">{'Hint: ' + msg[this.state.type]}</span>}
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

HintBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HintBar);
