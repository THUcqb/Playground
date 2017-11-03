import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createjs from 'preload-js';
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';

let manifest;
const preloader = new createjs.LoadQueue(false);

function setupManifest()
{
    manifest = [{
        src: process.env.PUBLIC_URL + "/grass.jpg",
        id: "square"
    }, {
        src: process.env.PUBLIC_URL + "/wall.jpg",
        id: "wall"
    }, {
        src: process.env.PUBLIC_URL + "/coin.jpg",
        id: "coin"
    }
    ];
}

function startPreload()
{
    preloader.on("progress", handleFileProgress);
    preloader.on("complete", loadComplete);
    preloader.on("error", loadError);
    preloader.loadManifest(manifest);
}

function handleFileProgress(event)
{
    console.log(preloader.progress);
}

function loadError(event)
{
    console.log("Error!", event.text);
    alert("Error");
}

function loadComplete(event)
{
    console.log("Finished Loading Assets");
    ReactDOM.render(<CookiesProvider><App /></CookiesProvider>,
        document.getElementById('root')
    );
    registerServiceWorker();
}

setupManifest();
startPreload();

export {preloader};

