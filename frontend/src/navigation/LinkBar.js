import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CopyIcon from 'material-ui-icons/ContentCopy';
import { THISURL } from '../config/api';
const copy = require('clipboard-copy');

const styles = theme => ({
    close: {width: theme.spacing.unit * 4, height: theme.spacing.unit * 4,},
});

class LinkBar extends React.Component {
    constructor(props) {
        super(props);
        LinkBar.singleton = this;
    }

    state = {open: false, msg: '',};

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway')
        {
            return;
        }
        copy(`${THISURL}/${this.state.msg}`);
        this.setState({ open: false });
    };

    static show(msg) {
        LinkBar.singleton.setState({open: true, msg: msg,});
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Snackbar
                    anchorOrigin={{vertical: 'center', horizontal: 'center',}}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    message={<span id="message-id">{`Link: Please tap copy to clipboard!`}</span>}
                    action={[
                        <IconButton
                            key="close" aria-label="Close" color="accent"
                            className={classes.close}
                            onClick={this.handleRequestClose}
                        >
                            <CopyIcon/>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

LinkBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinkBar);
