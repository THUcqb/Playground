import React from 'react';
import Map from '../logic/Map';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import Done from 'material-ui-icons/Done';
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
        this.map = new Map(10,10);
        this.map.editinit();
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
    if (name == 'mapSize') 
    {
      this.map = new Map(this.state.mapSize,this.state.mapSize);
      this.map.editinit();
    }

  };
    handleFinishEditing() {
    //TODO: to something including save the map and close the dialog.

        alert(this.state.mapSize);
    }

    handleClick(e) {
      const  element = this.refs.canvas;
      var rect = element.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      
      var c_max_x = element.width;
      var c_max_y = element.height;

      var block_size = this.state.mapSize;

      if (block_size == null) 
      {
        block_size = 10;
      }
      var b_x = Math.floor(Number(x / c_max_x * block_size));
      var b_y = Math.floor(Number(y / c_max_y * block_size));

      
      this.map.block_list[b_x][b_y].info =(1 + this.map.block_list[b_x][b_y].info)%3
      this.map.print();
      alert( this.state.mapSize + ":" + 'pos:('+x+" : "+y+")"+ "block:("+b_x+" : "+b_y+")"); // eslint-disable-line no-alert
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
                      ref="select"
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
                          {this.state.mapSize}
                          <canvas 
                            id="canvas" 
                            ref="canvas"
                            width="400" 
                            height="400"
                            onClick={(e) => this.handleClick(e)} 
                          />
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
    componentDidMount(){
    const select = this.refs.select;
    // const index = select.selectedIndex;
    // alert(select.options[index].value);
  }
}



MapEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MapEditor);

