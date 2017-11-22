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
import Star from 'material-ui-icons/Star'
import StarBorder from 'material-ui-icons/StarBorder';

const styles = theme => ({
    title: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        margin: theme.spacing.unit,
    },
    star: {
        width: 70,
        height: 70,
        color: 'gold',
    },
    stars: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
    }
});

class OverDialog extends React.Component {
    render() {
        const { classes } = this.props;

        const star = <Star className={classes.star} />;
        const starBorder = <StarBorder className={classes.star} />;
        let stars = [starBorder, starBorder, starBorder];
        for (let i = 0; i < this.props.starNum; i++)
        {
            stars[i] = star;
        }

        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                <DialogTitle className={classes.title}>{this.props.dialogTitle}</DialogTitle>
                <DialogContent className={classes.stars}>
                    {stars[0]}
                    {stars[1]}
                    {stars[2]}
                </DialogContent>
                <DialogActions className={classes.actions}>
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
                            disabled={!this.props.nextAvail}
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