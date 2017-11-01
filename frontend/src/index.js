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
        //src: "http://www.hbwksj.com/uploads/allimg/160719/2-160G91P92c30.jpg",
        src: "http://oyeyx4fo5.bkt.clouddn.com/17-10-26/48853568.jpg",
        id: "square"
    }, {
        src: "http://58pic.ooopic.com/58pic/12/91/84/91y58PIC2m7.jpg",
        id: "wall"
    }, {
        src: "http://img2.3png.com/58671647c614592d044808852d898920d52a.png",
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

