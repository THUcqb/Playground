import React, { Component } from 'react';
import Operation from './Operation';
import Scene from './Scene';
import Navigation from './Navigation/Navigation'
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
                    <Scene className="Scene"/>
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
