
function drawSinglePoint(canvasElementLeft,canvasElementRight) {
    let spinning = true;
    let length = 4.25;
    let offset = 1.25;

    let threeDAxis = new Zdog.Illustration({
        // set canvas with selector
        element: canvasElementLeft,
        zoom: 20,
        dragRotate: true,
        onDragStart: function () {
            spinning = false;
        },
    });
    console.log(threeDAxis);
    let xLine = new Zdog.Shape({
        addTo: threeDAxis,
        path: [{x: offset, y: 0}, {x: length, y: 0}],
        color: "#C44"
    });

    let xHat = new Zdog.Cone({
        addTo: threeDAxis,
        diameter: 2,
        length: 2,
        stroke: false,
        color: '#633',
        backface: '#C44',
        rotate: {y: Zdog.TAU * 3 / 4},//3/4 turn
        translate: {x: 5}
    });

    let yLine = new Zdog.Shape({
        addTo: threeDAxis,
        path: [{x: 0, y: -offset}, {x: 0, y: -length}],
        color: "#4C4"
    });

    let yHat = new Zdog.Cone({
        addTo: threeDAxis,
        diameter: 2,
        length: 2,
        stroke: false,
        color: '#363',
        backface: '#4C4',
        rotate: {x: Zdog.TAU / 4},
        translate: {y: -5}
    });

    let zLine = new Zdog.Shape({
        addTo: threeDAxis,
        path: [{x: 0, y: 0, z: offset}, {x: 0, z: length}],
        color: "#44C"
    });

    let zHat = new Zdog.Cone({
        addTo: threeDAxis,
        diameter: 2,
        length: 2,
        stroke: false,
        color: '#336',
        backface: '#44C',
        rotate: {y: 0},
        translate: {z: 5}
    });

    let origin3 = new Zdog.Shape({
        addTo: threeDAxis,
        stroke: 1,
        diameter: 2,
    });

    function animate() {
        // rotate illo each frame
        if (spinning) {
            threeDAxis.rotate.y += 0.01;
        }
        threeDAxis.updateRenderGraph();
        requestAnimationFrame(animate);
    }

    threeDAxis.updateRenderGraph();
    animate();

    /////

    let twoDAxis = new Zdog.Illustration({
        // set canvas with selector
        element: canvasElementRight,
        zoom: 20,
        dragRotate: true,
        onDragStart: function () {
            isSpinning = false;
        },
    });

    let uLine = new Zdog.Shape({
        addTo: twoDAxis,
        path: [{x: offset, y: 0}, {x: length, y: 0}],
        color: "#CC4"
    });

    let uHat = new Zdog.Cone({
        addTo: twoDAxis,
        diameter: 2,
        length: 2,
        stroke: false,
        color: '#663',
        backface: '#CC4',
        rotate: {y: -Zdog.TAU / 4},
        translate: {x: 5}
    });

    let vLine = new Zdog.Shape({
        addTo: twoDAxis,
        path: [{x: 0, y: -offset}, {x: 0, y: -length}],
        color: "#4CC"
    });

    let vHat = new Zdog.Cone({
        addTo: twoDAxis,
        diameter: 2,
        length: 2,
        stroke: false,
        color: '#366',
        backface: '#4CC',
        rotate: {x: Zdog.TAU / 4},
        translate: {y: -5}
    });

    let origin2 = new Zdog.Shape({
        addTo: twoDAxis,
        stroke: 1,
        diameter: 2,
    });


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
        translate: {x: 3, y: -3},
    });

    twoDAxis.updateRenderGraph();
}

drawSinglePoint('.zdog-singlePoint3d','.zdog-singlePoint2d2');
drawSinglePoint('.zdog-singlePoint','.zdog-singlePoint2');