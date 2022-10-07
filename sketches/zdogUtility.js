let length = 4.25;
let offset = 1.25;
let TAU = Zdog.TAU;
function Create3DAxis(canvasElement)
{
    let spinning = true;

    let threeDAxis = new Zdog.Illustration({
        // set canvas with selector
        element: canvasElement,
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
        rotate: {y: TAU * 3 / 4},//3/4 turn
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
        rotate: {x: TAU / 4},
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
        // rotate each frame
        if (spinning) {
            threeDAxis.rotate.y += 0.01;
        }
        threeDAxis.updateRenderGraph();
        requestAnimationFrame(animate);
    }

    threeDAxis.updateRenderGraph();
    animate();
    return threeDAxis;
}

function Create2DAxis(canvasElement)
{
    let l = length*2;
    let isSpinning = true;

    let twoDAxis = new Zdog.Illustration({
        // set canvas with selector
        element: canvasElement,
        zoom: 20,
        dragRotate: true,
        onDragStart: function () {
            isSpinning = false;
        },
        translate: {x:-5,y:5}
    });

    let uLine = new Zdog.Shape({
        addTo: twoDAxis,
        path: [{x: offset, y: 0}, {x: l, y: 0}],
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
        translate: {x: (l+0.75)}
    });

    let vLine = new Zdog.Shape({
        addTo: twoDAxis,
        path: [{x: 0, y: -offset}, {x: 0, y: -l}],
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
        translate: {y: -(l+0.75)}
    });

    let origin2 = new Zdog.Shape({
        addTo: twoDAxis,
        stroke: 1,
        diameter: 2,
    });
    twoDAxis.updateRenderGraph();
    return twoDAxis;
}