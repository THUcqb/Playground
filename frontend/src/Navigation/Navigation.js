import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SigninButton from './Sign'
class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar
                    title="Snake"
                    iconElementRight={<SigninButton />}
                    iconStyleRight={{width: 100}}
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer
                    overlayStyle={{"top": "64px"}}
                    containerStyle={{"top": "64px"}}
                    docked={false}
                    width="25%"
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
                    <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default Navigation;