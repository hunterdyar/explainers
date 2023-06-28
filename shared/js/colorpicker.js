
let red = 0;
let green = 0;
let blue = 0;
let block = document.getElementById("colorpreview");
let colorcode = document.getElementById("colorcode");

let coldecred = document.getElementById("col-dec-red");
let coldecgreen = document.getElementById("col-dec-green");
let coldecblue = document.getElementById("col-dec-blue");

coldecred.onchange = function () {
    decChange();
    updateBlock();
}
coldecgreen.onchange = function (){
    decChange();
    updateBlock();
}
coldecblue.onchange = function (){
    decChange();
    updateBlock();
}

let colhexred = document.getElementById("col-hex-red");
let colhexgreen = document.getElementById("col-hex-green");
let colhexblue = document.getElementById("col-hex-blue");

colhexred.onchange = function () {
    hexChange();
    updateBlock();
}
colhexgreen.onchange = function (){
    hexChange();
    updateBlock();
}
colhexblue.onchange = function (){
    hexChange();
    updateBlock();
}

let colslidered = document.getElementById("col-slide-red");
let colslidegreen = document.getElementById("col-slide-green");
let colslideblue = document.getElementById("col-slide-blue");

colslidered.oninput = function ()
{
    slideChange();
    updateBlock();
}

colslidered.onchange = function () {
    slideChange();
    updateBlock();
}
colslidegreen.oninput = function (){
    slideChange();
    updateBlock();
}
colslidegreen.onchange = function (){
    slideChange();
    updateBlock();
}
colslideblue.oninput = function (){
    slideChange();
    updateBlock();
}
colslideblue.onchange = function (){
    slideChange();
    updateBlock();
}

function decChange()
{
    red = parseInt(coldecred.value);
    colhexred.value = red.toString(16).toUpperCase();
    colslidered.value = (red/255)*100;

    green = parseInt(coldecgreen.value);
    colhexgreen.value = green.toString(16).toUpperCase();
    colslidegreen.value = (green/255)*100;

    blue = parseInt(coldecblue.value);
    colhexblue.value = blue.toString(16).toUpperCase();
    // colslideblue.setAttribute("value", (blue/255).toString());
    colslideblue.value = (blue/255)*100;
}
function hexChange()
{
    colhexred.value = colhexred.value.toUpperCase();
    red = parseInt(colhexred.value,16);
    red = Math.round(Math.max( 0, Math.min(red, 255)))
    colslidered.value = (red/255)*100;
    coldecred.value = red;

    colhexgreen.value = colhexgreen.value.toUpperCase();
    green = parseInt(colhexgreen.value,16);
    green = Math.round(Math.max( 0, Math.min(green, 255)))
    colslidegreen.value = (green/255)*100;
    coldecgreen.value = green;

    colhexblue.value = colhexblue.value.toUpperCase();
    blue = parseInt(colhexblue.value,16);
    blue = Math.round(Math.max( 0, Math.min(blue, 255)))
    colslideblue.value = (blue/255)*100;
    coldecblue.value = blue;
}
function slideChange()
{
    red = colslidered.value/100 * 255;
    red = Math.round(red);
    colhexred.value = red.toString(16).toUpperCase();
    coldecred.value = red;

    green = colslidegreen.value/100 * 255;
    green = Math.round(green);
    colhexgreen.value = green.toString(16).toUpperCase();
    coldecgreen.value = green;

    blue = colslideblue.value/100 * 255;
    blue = Math.round(blue);
    colhexblue.value = blue.toString(16).toUpperCase();
    coldecblue.value = blue;
}
function updateBlock(){
    block.style.backgroundColor = "rgb("+red+","+green+","+blue+")";
    var hexred = colhexred.value;
    if(hexred.length === 1)
    {
        hexred = "0"+hexred;
    }
    var hexgreen = colhexgreen.value;
    if(hexgreen.length === 1)
    {
        hexgreen = "0"+hexgreen;
    }
    var hexblue = colhexblue.value;
    if(hexblue.length === 1)
    {
        hexblue = "0"+hexblue;
    }
    colorcode.innerText = "#"+hexred+hexgreen+hexblue;
}

//remember form entries from previous page laod.
decChange();
updateBlock();
