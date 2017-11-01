import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';

const styles = theme => ({
    button: {
        flex: 1,
        margin: 10,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});

class LevelDialog extends React.Component {
    state = {
        chipData: [
            { key: 0, label: "Level0" },
            { key: 1, label: "Level1" },
            { key: 2, label: "Level2" },
            { key: 3, label: "Level3" },
            { key: 4, label: "Level4" },
        ],
    };
    
    styles = {
        chip: {
            margin: 4,
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap',
        },
    };
    
    render() {
        const { classes } = this.props;
        
        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                <DialogTitle>Choose a level</DialogTitle>
                <DialogContent>
                    <div className={classes.row}>
                        {this.state.chipData.map(data => {
                            return (
                                <Chip
                                    label={data.label}
                                    key={data.key}
                                    className={classes.chip}
                                    onClick={() => this.props.onChooseLevel(data.key)}
                                />
                            );
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles, {withTheme: true})(LevelDialog);
