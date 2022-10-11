let uvCanvas = 'textureSampleCanvas1';
const canvas = document.getElementById('textureSampleCanvas3');
const ctx = canvas.getContext("2d");
const image = document.getElementById("crateImg");
let arrows;
let size = 300;

// get svg element
let svg = document.querySelector('svg');
// rendering sizes
const zoom = 1;
let sceneWidth = 20;
let sceneHeight = 20;
let viewWidth = sceneWidth * zoom;
let viewHeight = sceneHeight * zoom;
let svgWidth = svg.getAttribute('width');
let svgHeight = svg.getAttribute('height');
// set viewBox using zoom
svg.setAttribute( 'viewBox', `${-viewWidth/2}  ${-viewHeight/2} ` +
    `${viewWidth} ${viewHeight}` );


image.addEventListener("load", (e) => {

    arrows = drawLabeledUV('textureSampleCanvas1');
    renderBoth(ctx,arrows);

    // drawLabeledUV('textureSampleCanvas2');
    let sampled = drawLabeledUV('textureSampleCanvas3');
    let point2 = new Zdog.Shape({
        addTo: sampled,
        stroke: 1,
        color: '#908373',
        translate: {x: 5, y: -5},
    });
    sampled.updateRenderGraph();
});

function renderBoth(ctx,arrows) {
    let anchor = new Zdog.Anchor();
    //
    arrows.children.forEach((child) => {
        anchor.children.push(child);
    });

    let point2 = new Zdog.Shape({
        addTo: anchor,
        stroke: 1,
        color: '#E62',
        translate: {x: 5, y: -5},
    });

    anchor.renderGraphCanvas( ctx );
    anchor.renderGraphSvg( svg );
    ctx.restore();
}

//todo: replace this with drawing without Illustration, so the bg doesnt get cleared, so the image can get drawn below it.
//I think drawing to an SVG will be the way to go.
function drawLabeledUV(canvas) {
    let twoDAxis = Create2DAxis("#"+canvas);
    twoDAxis.color = "";

    //u0 label
    new Zdog.Text({
        addTo: twoDAxis,
        font: font,
        stroke: 0.2,
        value: '0',
        fontSize: 2,
        color: '#663',
        fill:true,
        translate: {x: 0, y: 3},
        rotate: {y: 0}
    });
    //u1 label
    new Zdog.Text({
        addTo: twoDAxis,
        font: font,
        stroke: 0.2,
        value: '1',
        fontSize: 2,
        color: '#663',
        fill:true,
        translate: {x: 9, y: 3},
        rotate: {y: 0}
    });
    //v0 label
    new Zdog.Text({
        addTo: twoDAxis,
        font: font,
        stroke: 0.2,
        value: '0',
        fontSize: 2,
        color: '#366',
        fill:true,
        translate: {y: 0, x: -2.6},
    });
    //v1 label
    new Zdog.Text({
        addTo: twoDAxis,
        font: font,
        stroke: 0.2,
        value: '1',
        fontSize: 2,
        color: '#366',
        fill:true,
        translate: {y: -9.5, x: -2.6},
    });
    twoDAxis.updateRenderGraph();
    return twoDAxis;
}

