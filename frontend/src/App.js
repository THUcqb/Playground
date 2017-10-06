import React, { Component } from 'react';
import Operation from './Operation';
import Game from './Game';
import Navigation from './Navigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component
{
    render()
    {
        return (
            <MuiThemeProvider>
            <div className="App">
                <Navigation className="App-header"/>
                <div className='SceneArea'>
                    <Game className="Game"/>
                </div>
                <div className='GamepadArea'>
                    <Operation className="Operation"/>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
