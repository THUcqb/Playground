import React from 'react';
import Button from 'material-ui/Button';
import MapEditor from './MapEditor';

class MapEditorButton extends React.Component {
    /**
     * @constructor
     * @param props
     * @state open - If the dialog is open
     */
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleRequestClose() {
        this.setState({open: false});
    }

    render() {
        return (
            <div>
                <Button raised color = "primary" onClick={() => this.handleClickOpen()}>Open Map Editor</Button>
                <MapEditor
                    open={this.state.open}
                    onRequestClose={() => this.handleRequestClose()}
                />
            </div>
        )
    }
}

export default MapEditorButton;
