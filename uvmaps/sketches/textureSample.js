let uvCanvas = 'textureSampleCanvas';
const canvas = document.getElementById(uvCanvas);
const ctx = canvas.getContext("2d");
const image = document.getElementById("crateImg");

image.addEventListener("load", (e) => {
    // ctx.drawImage(image, 0, 0, 300, 300);
    drawPlainUV(uvCanvas);
});

//todo: replace this with drawing without Illustration, so the bg doesnt get cleared, so the image can get drawn below it.
//I think drawing to an SVG will be the way to go.
function drawPlainUV(canvas) {
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
}

