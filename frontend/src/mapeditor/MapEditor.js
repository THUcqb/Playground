import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  
});

  const currencies = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '10',
    label: 'S',
  },
  {
    value: '20',
    label: 'L',
  },
  {
    value: '15',
    label: 'M',
  },
 ];
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
    
    handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
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
                    {/*TODO: Map Editor body here */
                    <div>   
                           
                    <TextField
                      id="select-size"
                      select
                      label="Size select"
                      className={classes.textField}
                      value={this.state.mapSize}
                      onChange={this.handleChange('mapSize')}
                      SelectProps={{
                        native: true,
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      helperText="Please select your Map size"
                      margin="normal"
                    >
                      {currencies.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                       <div>
                          <canvas id="canvas" ref="canvas" width="400" height="400" />
                       </div>
                    </div>
                    }
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={() => this.handleFinishEditing()} color="primary">
                        Start
                    </Button>
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

