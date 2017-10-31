import React from 'react';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

/**
 * The MapEditor.
 */
class MapEditor extends React.Component {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    /**
     * Triggered when the user clicks SAVE button.
     */
    handleFinishEditing() {
    //TODO: to something including save the map and close the dialog.

        alert("map saved!");
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                <DialogTitle>Map Editor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Explore and create your own map !
                    </DialogContentText>
                    {/*TODO: Map Editor body here */}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={() => this.handleFinishEditing()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

MapEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MapEditor);
