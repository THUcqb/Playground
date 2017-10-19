import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';

class GameActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageSelectionOpen: false,
            anchorEl: null,
            anchorOriginVertical: 'bottom',
        }
    }

    handleReset() {
        this.props.reset();
    };

    handleSubmit() {
        this.props.submit();
    };

    handleView() {
        this.props.view();
    };

    handleLanguageSelectionOpen(ev)
    {
        this.setState({
            languageSelectionOpen: true,
            anchorEl: ev.currentTarget,
        });
    }

    handleLanguageSelectionClose()
    {
        this.setState({languageSelectionOpen: false});
    }

    render() {
        return (
            <Toolbar color="primary">
                <Button raised
                    ref={node => {this.toggleLanguageSelectionButton = node;}}
                    onClick={(ev) => this.handleLanguageSelectionOpen(ev)}
                >
                    Language
                </Button>
                <Menu
                    open={this.state.languageSelectionOpen}
                    onRequestClose={() => this.handleLanguageSelectionClose()}
                    anchorEl={this.state.anchorEl}
                >

                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>Javascript</MenuItem>
                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>Python</MenuItem>
                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>PHP</MenuItem>
                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>Lua</MenuItem>
                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>Dart</MenuItem>

                </Menu>
                    <Button raised onClick={() => this.handleView()}>View</Button>
                    <Button raised onClick={() => this.handleReset()}>Reset</Button>
                    <Button raised onClick={() => this.handleSubmit()}>Submit Code</Button>
            </Toolbar>
        )
    }
}

export default GameActions;
