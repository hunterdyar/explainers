// zdog-demo.js
let isSpinning = true;
let TAU = Zdog.TAU;//Tau is a full turn.

let length = 4.25;
let offset = 1.25;

let threeDAxis = new Zdog.Illustration({
    // set canvas with selector
    element: '.zdog-canvas',
    zoom:20,
    dragRotate: true,
    onDragStart: function() {
        isSpinning = false;
    },
});

let xLine = new Zdog.Shape({
    addTo: threeDAxis,
    path: [ { x: offset,y:0 }, { x: length,y:0 } ],
    color: "#C44"
});

let xHat = new Zdog.Cone({
    addTo: threeDAxis,
    diameter: 2,
    length: 2,
    stroke: false,
    color: '#633',
    backface: '#C44',
    rotate: { y: TAU*3/4 },//3/4 turn
    translate: {x:5}
});

let yLine = new Zdog.Shape({
    addTo: threeDAxis,
    path: [ { x: 0,y:-offset }, { x: 0,y:-length } ],
    color: "#4C4"
});

let yHat = new Zdog.Cone({
    addTo: threeDAxis,
    diameter: 2,
    length: 2,
    stroke: false,
    color: '#363',
    backface: '#4C4',
    rotate: { x: TAU/4 },
    translate: {y:-5}
});

let zLine = new Zdog.Shape({
    addTo: threeDAxis,
    path: [ { x: 0,y:0,z:offset }, { x: 0,z:length } ],
    color: "#44C"
});

let zHat = new Zdog.Cone({
    addTo: threeDAxis,
    diameter: 2,
    length: 2,
    stroke: false,
    color: '#336',
    backface: '#44C',
    rotate: { y: 0 },
    translate: {z:5}
});

let origin3 = new Zdog.Shape({
    addTo: threeDAxis,
    stroke: 1,
    diameter: 2,
});

let face3 = new Zdog.Rect({
    addTo: threeDAxis,
    width: 3,
    height: 2,
    stroke: 0.5,
    color: '#E62',
    translate: {x: 3, y: -3, z: 3},
    rotate: {y: TAU/5, x:TAU/3, Z: TAU/3}
});

function animate() {
    // rotate illo each frame
    if(isSpinning) {
        threeDAxis.rotate.y += 0.01;
    }
    threeDAxis.updateRenderGraph();
    requestAnimationFrame( animate );
}
// start animation
animate();

// update & render
threeDAxis.updateRenderGraph();


////// 2D axis
let twoDAxis = new Zdog.Illustration({
    // set canvas with selector
    element: '.zdog-canvas2',
    zoom:20,
    dragRotate: true,
    onDragStart: function() {
        isSpinning = false;
    },
});


let uLine = new Zdog.Shape({
    addTo: twoDAxis,
    path: [ { x: offset,y:0 }, { x: length,y:0 } ],
    color: "#CC4"
});

let uHat = new Zdog.Cone({
    addTo: twoDAxis,
    diameter: 2,
    length: 2,
    stroke: false,
    color: '#663',
    backface: '#CC4',
    rotate: { y: -TAU/4 },
    translate: {x:5}
});

let vLine = new Zdog.Shape({
    addTo: twoDAxis,
    path: [ { x: 0,y:-offset }, { x: 0,y:-length } ],
    color: "#4CC"
});

let vHat = new Zdog.Cone({
    addTo: twoDAxis,
    diameter: 2,
    length: 2,
    stroke: false,
    color: '#366',
    backface: '#4CC',
    rotate: { x: TAU/4 },
    translate: {y:-5}
});

let origin2 = new Zdog.Shape({
    addTo: twoDAxis,
    stroke: 1,
    diameter: 2,
});

let face2 = new Zdog.Rect({
    addTo: twoDAxis,
    width: 3,
    height: 2,
    stroke: 0.5,
    color: '#E62',
    translate: {x: 3, y: -3},
});

twoDAxis.updateRenderGraph();