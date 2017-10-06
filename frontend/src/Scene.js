import React, { Component } from 'react';

class Scene extends Component
{
    render()
    {
        return (
            <div>
                <canvas id="canvas" width="1000" height="700" />
            </div>
        );
    }

    componentDidMount()
    {
        const c = document.getElementById("canvas");
        const cxt=c.getContext("2d");
        cxt.fillStyle="#FF0000";
        cxt.fillRect(0,0,150,75);
    }
}

export default Scene;
