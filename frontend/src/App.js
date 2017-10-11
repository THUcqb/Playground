import React, { Component } from 'react';
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
            </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
