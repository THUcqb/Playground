import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

class LevelDialog extends React.Component {
    
    render() {
        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                <DialogTitle>Choose a level</DialogTitle>
                <DialogContent>
                    <Button raised className="level0"
                            onClick={() => this.props.onChooseLevel(0)}>
                        Level0
                    </Button>
                    <Button raised className="level1"
                            onClick={() => this.props.onChooseLevel(1)}>
                        Level1
                    </Button>
                    <Button raised className="level2"
                            onClick={() => this.props.onChooseLevel(2)}>
                        Level2
                    </Button>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles, {withTheme: true})(LevelDialog);
