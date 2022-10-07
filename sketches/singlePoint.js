
function drawSinglePoint(canvasElementLeft,canvasElementRight) {
    let threeDAxis = Create3DAxis(canvasElementLeft);
    let twoDAxis = Create2DAxis(canvasElementRight);

    //Point!
    let point3 = new Zdog.Shape({
        addTo: threeDAxis,
        stroke: 0.5,
        color: '#E62',
        translate: {x: 1, y: -2, z: 3},
    });


    let point2 = new Zdog.Shape({
        addTo: twoDAxis,
        stroke: 0.5,
        color: '#E62',
        translate: {x: 5, y: -5},
    });


    threeDAxis.updateRenderGraph();
    twoDAxis.updateRenderGraph();
}

//first single one
function drawFirstPoint()
{
    let threeDAxis = Create3DAxis('.zdog-singlePoint');
    let point3 = new Zdog.Shape({
        addTo: threeDAxis,
        stroke: 0.5,
        color: '#E62',
        translate: {x: 1, y: -2, z: 3},
    });
    threeDAxis.updateRenderGraph();
}


//First point, under "Introducing UVs
drawFirstPoint();

//Side by side pair in intro uvs
drawSinglePoint('.zdog-singlePoint3d','.zdog-singlePoint2d2');
