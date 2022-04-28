const blueBlock = decodeURI("%F0%9F%9F%A6");
const redBlock = decodeURI("%F0%9F%9F%A5");

function encrypt(str) {
    if (!str) {
        return str;
    }
    var coded = "";
    for (var i = 0; i < str.length; i++) {
        var b = true, c = str.charCodeAt(i);
        var t = "";
        while (c >= 16) {
            t = repeat(b ? blueBlock : redBlock, c % 16 + 1) + "\n" + t;
            c = (c - c % 16) / 16;
            b = !b;
        }
        t = repeat(b ? blueBlock : redBlock, c % 16 + 1) + "\n" + t;
        coded += t + "\n";
    }
    return coded;
}

function repeat(str, num) {
    var ret = "";
    for (var i = 0; i < num; i++) {
        ret += str;
    }
    return ret;
}

function decrypt(str) {
    var lines = str.split("\n");
    var i = 0, j = 0, ret = "";
    while (i < lines.length) {
        if (lines[i].length) {
            j *= 16;
            j += (lines[i].length / 2 - 1);
        } else {
            if (j) {
                ret += String.fromCharCode(j);
            }
            j = 0;
        }
        i++;
    }
    return ret;
}

const dictionary = [
    "chenjie",
    "taenia solium",
    "bug",
    "parasite",
    "pork sashimi",
    "delete",
    "censor",
    "foreign forces",
    "red blue red blue red",
    "measly pork",
    "martisu"
];

function selectWord(ch) {
    while (true) {
        var rnd = Math.floor(Math.random() * dictionary.length);
        if (dictionary[rnd].indexOf(ch) >= 0) {
            return dictionary[rnd];
        }else if(dictionary[rnd].toUpperCase().indexOf(ch) >= 0){
            return dictionary[rnd].toUpperCase();
        }
    }
}

function arrangeNumbers(num) {
    for (var i = 0; i < 32; i++) {
        var _6 = i >= 16;
        var _5 = (i % 16) >= 8;
        var _4 = (i % 8) >= 4;
        var _7 = (i % 4) >= 2;
        var _2 = (i % 2) >= 1;
        if (
            (_6 * 2 - 1) * 6 +
            (_5 * 2 - 1) * 5 +
            (_4 * 2 - 1) * 4 +
            (_7 * 2 - 1) * 7 +
            (_2 * 2 - 1) * 2
            == (num - num % 2)
        ) {
            return `${_6 ? "+" : "-"}6`
                + `${_5 ? "+" : "-"}5`
                + `${_4 ? "+" : "-"}4`
                + `${_7 ? "+" : "-"}7`
                + `${_2 ? "+" : "-"}2`
                + (num % 2 ? "+!![]" : "");
        }
    }
    return "" + num;
}

function generateWord(str){
    var ret = [];
    for(var i = 0;i < str.length; i++){
        var word = selectWord(str[i]);
        ret.push(`"${word}"[${arrangeNumbers(word.indexOf(str[i]))}]`);
    }
    return ret.join("+");
}

function generateEncodedDecrypter(){
    return "" +
`((_6,_5,_4,_7,_2)=>{` +
    `_5=_6[${generateWord("split")}]("\\n");` +
    `_4=${arrangeNumbers(0)};_7=${arrangeNumbers(0)};_2="";` +
    `while(_4<_5[${generateWord("length")}]){` +
        `if(_5[_4][${generateWord("length")}]){` +
            `_7*=${arrangeNumbers(16)};` +
            `_7+=_5[_4][${generateWord("length")}]/(${arrangeNumbers(2)})-(${arrangeNumbers(1)});` +
        `}else{` +
            `if(_7){_2+=String[${generateWord("fromCharCode")}](_7);}` +
            `_7=${arrangeNumbers(0)};` +
        `}` +
        `_4++;` +
    `}` +
    `eval(_2);` +
`})`;
}

function generateEncryptedScript(str){
    return generateEncodedDecrypter() + "(`\n" + encrypt(str) + "`);";
}