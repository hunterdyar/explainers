
var ss_s = document.getElementById('ssSlider');
const ss_list = document.getElementById('shutterList');
var a_s = document.getElementById('apertureSlider');
const a_list = document.getElementById('apertureList');
var iso_s = document.getElementById('isoSlider');
const iso_list = document.getElementById('isoList');
var img = document.getElementById("imgname");

let ss = 50
let a = 5.6
let iso = 200

//todo: set lists from search through directory and parsing all available files.

//init
let shutters = [10,20,30,60,400,500,1000]
populateDataList(shutters,ss_list)
ss_s.setAttribute("min",0)
ss_s.setAttribute("max",shutters.length-1)
ss_s.setAttribute("step",1)

let apertures = [1.8,2,2.8,4,5.6,8,11,16,22]
populateDataList(apertures,a_list)
a_s.setAttribute("min",0)
a_s.setAttribute("max",apertures.length-1)
a_s.setAttribute("step",1)

let isos = [100,200,400,800,1200,1600,12800]
populateDataList(isos,iso_list)
iso_s.setAttribute("min",0)
iso_s.setAttribute("max",isos.length-1)
iso_s.setAttribute("step",1)

function update_image(){
    // ctx.clear();
    img.innerText = "s"+ss+"_a"+a+"_iso"+iso;
    //load image from filename using syntax.
}

update_image()


function populateDataList(array,dataList) {
    dataList.innerHTML = ""
    for (let i=0;i<array.length;i++){
        let item = array[i]
        var option = document.createElement("option");
        option.innerHTML = item;
        option.setAttribute("value",i)
        dataList.appendChild(option);
    }
}

ss_s.oninput = function() {
    ss = shutters[this.value];
    update_image();
}
a_s.oninput = function() {
    a = apertures[this.value];
    update_image();
}
iso_s.oninput = function() {
    iso = isos[this.value];
    update_image();
}

function max(numArray) {
    return Math.max.apply(null, numArray);
}
function min(numArray) {
    return Math.min.apply(null, numArray);
}
