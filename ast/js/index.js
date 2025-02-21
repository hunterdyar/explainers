// import {parse} from "./acorn/acorn/src/index";

const generate_btn = document.getElementById("generateButton")
const svg_div = document.getElementById("output");
const textarea = document.getElementById("sourceTextarea");
const outputGV = document.getElementById("outputGV");

generate_btn.onclick = function (x){
   UpdateGraphviz();
};

textarea.oninput = function (x){
     UpdateGraphviz();
}

const viz = Viz.instance();
function UpdateGraphviz() {
    svg_div.innerHTML = "";
    var data = textarea.value;
    var o = Convert(data);
    outputGV.innerText = o;
    var svg = "";
    Viz.instance().then(function(viz) {

       svg = viz.renderSVGElement(o);
       svg_div.appendChild(svg);
    });
}




