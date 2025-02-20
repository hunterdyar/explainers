// import {parse} from "./acorn/acorn/src/index";

const generate_btn = document.getElementById("generateButton")
const svg_div = document.getElementById("output");
const textarea = document.getElementById("sourceTextarea");

// let a = parse("1+1");
// console.log(a);

generate_btn.onclick = function (x){
   UpdateGraphviz();
};

textarea.oninput = function (x){
    console.log(textarea.value)
     UpdateGraphviz();
}

const viz = Viz.instance();
function UpdateGraphviz() {
    svg_div.innerHTML = "";
    var data = textarea.value;
    var svg = "";
    Viz.instance().then(function(viz) {
       svg = viz.renderSVGElement(data);
       svg_div.appendChild(svg);
    });


}




