import React from 'react';
import Button from 'material-ui/Button';
import LevelDialog from './LevelDialog';

class LevelButton extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    
    handleClickOpen() {
        this.setState({open: true});
    }
    
    handleRequestClose() {
        this.setState({open: false});
    }
    
    handleChooseLevel(levelNum) {
        this.props.onChooseLevel(levelNum);
        this.setState({open: false});
    }
    
    render() {
        return (
            <div>
                <Button raised color="primary" onClick={() => this.handleClickOpen()}> Levels </Button>
                <LevelDialog
                    open={this.state.open}
                    onRequestClose={() => this.handleRequestClose()}
                    onChooseLevel={(levelNum) => this.handleChooseLevel(levelNum)}
                />
            </div>
        );
    }
}

export default LevelButton;
