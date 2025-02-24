// import {parse} from "./acorn/acorn/src/index";

//inputs
const generate_btn = document.getElementById("generateButton")
const genWhileTypingCheckbox = document.getElementById("genWhileTyping")
const showGraphViz = document.getElementById("showGraphViz")

//other stuff
const svg_div = document.getElementById("output");
const textarea = document.getElementById("sourceTextarea");
const outputGV = document.getElementById("outputGV");


generate_btn.onclick = function (x){
   UpdateGraphviz();
};

textarea.oninput = function (x){
    if(genWhileTypingCheckbox.checked) {
        UpdateGraphviz();
    }
}

showGraphViz.onclick = function (x){
    UpdateGraphviz();
}

const viz = Viz.instance();
function UpdateGraphviz() {
    var data = textarea.value;
    var o = Convert(data);
    if(!o){
        return;
    }
    svg_div.innerHTML = "";

    if(showGraphViz.checked) {
        outputGV.innerText = o;
    }else{
        outputGV.innerText = "";
    }
    var svg = "";
    Viz.instance().then(function(viz) {

       svg = viz.renderSVGElement(o);
       svg_div.appendChild(svg);
    });
}

UpdateGraphviz();




