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
    }, {
        src: process.env.PUBLIC_URL + "/role.png",
        id: "role"
    }, {
        src: process.env.PUBLIC_URL + "/treasure.png",
        id: "treasure"
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
//    TODO: handleFileProgress
}

function loadError(event)
{
    //    TODO: handleLoadError
}

function loadComplete(event)
{
    ReactDOM.render(<CookiesProvider><App /></CookiesProvider>,
        document.getElementById('root')
    );
    registerServiceWorker();
}

setupManifest();
startPreload();

export {preloader};

