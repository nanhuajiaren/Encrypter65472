const characters = [
    "+",
    "-",
    "*",
    "/",
    "%",
    "&",
    "|",
    "<<",
    ">>",
    "!"
];

var numbers = [6, 5, 4, 7, 2];

var found = [];

function addFound(result, str){
    found[result] = found[result] || [];
    if(str.startsWith("+")){
        str = str.substr(1);
    }
    if(found[result][0] && str.length > found[result][0].length){
        return;
    }
    if(found[result][0] && str.length < found[result][0].length){
        found[result] = [];
    }
    found[result].push(str);
}
var max = Math.pow(characters.length, numbers.length);
console.log(max);
console.log("----------------------------------------------------------------");

for(var i = 0;i < max; i++){
    var t = i, str = "";
    for(var j in numbers){
        var x = t % characters.length;
        str += characters[x];
        str += numbers[j];
        t -= x;
        t /= characters.length;
    }
    //console.log(str);
    var result = 0;
    try{
        result = eval(str);
        if(result != NaN && Math.floor(result) == result){
            addFound(result, str);
        }
    }catch(e){}
}

console.log("----------------------------------------------------------------");

var t = 0;
var output = [];
output.push("[")
for(var i = 0; i < 256 && t <= 128; i++){
    output.push("    //" + i + " : " + (found[i] ? found[i].length : "NOT FOUND"));
    output.push("    [");
    if(found[i]){
        t++;
        for(var j = 0;j < found[i].length && j < 10;j ++){
            output.push(`        "${found[i][j]}",`);
        }
    }
    output.push("    ],");
}
output.push("]");

var fs = require("fs");
fs.writeFileSync("1.txt", output.join("\n"));