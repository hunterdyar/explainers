//blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
function romanize (num) {
    if (isNaN(num))
        return NaN;
    let digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize (str) {
    str = str.toUpperCase();
    const validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    const token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    const key = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
    let num = 0, m;
    if (!(str && validator.test(str))) return false;
    while (m = token.exec(str)) num += key[m[0]];
    return num;
}

let romanroman = document.getElementById("roman-roman");
let romandecimal= document.getElementById("roman-decimal");

romandecimal.onchange = function (){onRomanDecimalChange()};
romanroman.onchange = function (){onRomanRomanChange()};
function onRomanDecimalChange(){
    let value =Math.round(romandecimal.value);
    romandecimal.value = value;
    value = romanize(value);
    romanroman.value =value;
}
function onRomanRomanChange()
{
    romandecimal.value =deromanize(romanroman.value);
}

//Binary

let number = 0;
let counter = document.getElementById("binaryCounter");
let decCounter = document.getElementById("decimalBinaryCounter");
let counterminus = document.getElementById("counter-minus");
let counterplus= document.getElementById("counter-plus");

counterplus.onclick = function (){binaryCounter(1)};
counterminus.onclick = function (){binaryCounter(-1)};
binaryCounter(0);

function binaryCounter(delta)
{
    number = number+delta;
    if(number < 0){
        number = 0;
    }
    counterminus.disabled = number===0;
    counterplus.disabled = number===255;//I have not tested this.
    let n = (number >>> 0).toString(2);
    counter.innerText = "00000000".substring(n.length) + n;
    decCounter.innerText = number;
}

//Hex

let hexhex = document.getElementById("hex-hex");
let hexdec= document.getElementById("hex-decimal");

hexhex.onchange = function (){onHexHexChange()};
hexdec.onchange = function (){onHexDecChange()};
function onHexHexChange()
{
    hexdec.value = parseInt(hexhex.value,16);
    hexhex.value = hexhex.value.toUpperCase();
}
function onHexDecChange()
{
    let n = parseInt(hexdec.value.toString());
    hexhex.value = n.toString(16).toUpperCase();
}
