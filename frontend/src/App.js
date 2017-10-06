import React, { Component } from 'react';
import Operation from './Operation';
import Scene from './Scene';
import './App.css';

class App extends Component
{
    render()
    {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Snake</h1>
                </header>
                <Operation className="Operation"/>
                <Scene className="Scene"/>
            </div>
        );
    }
}

export default App;
