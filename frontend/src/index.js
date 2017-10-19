import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createjs from 'preload-js';
import registerServiceWorker from './registerServiceWorker';

let manifest;
let preload;

function setupManifest()
{
    manifest = [{
        src: "logo.svg",
        id: "logo"
    }
    ];
}

function startPreload()
{
    preload = new createjs.LoadQueue(false);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}

function handleFileProgress(event)
{
    console.log(preload.progress);
}

function loadComplete(event)
{
    console.log("Finished Loading Assets");
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
}

function loadError(event)
{
    console.log("Error!", event.text);
    alert("Error");
}

setupManifest();
startPreload();

