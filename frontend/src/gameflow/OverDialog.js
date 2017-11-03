import React from 'react';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogActions,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import NextIcon from 'material-ui-icons/ArrowForward';
import LevelsIcon from 'material-ui-icons/List';
import ReplayIcon from 'material-ui-icons/Replay';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class OverDialog extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                <DialogTitle>{this.props.dialogTitle}</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button fab className={classes.button}
                            onClick={() => this.props.onLevels()}
                            color="primary"
                            aria-label="levels"
                    >
                        <LevelsIcon/>
                    </Button>
                    <Button fab className={classes.button}
                            onClick={() => this.props.onReplay()}
                            color="primary"
                            aria-label="replay"
                    >
                        <ReplayIcon/>
                    </Button>
                    <Button fab className={classes.button}
                        onClick={() => this.props.onNext()}
                        color="primary"
                        aria-label="next"
                    >
                        <NextIcon/>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

OverDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(OverDialog);