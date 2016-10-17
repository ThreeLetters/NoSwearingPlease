"use strict"
const StringBuild = require('StringBuild.js')
const list = JSON.parse(require('fs').readFileSync('./badwords.json',"utf8"))

module.exports = class NoSwearing {
    constructor() {
        
        
    }
escape(text) {
    
    var keys = "q w e r t y u i o p a s d f g h j k l ; ' z x c v b n m"
    
    var k = keys.split(" ")
    var map = {
        r: true,
        b: true,
        d: true,
        e: true,
        g: true,
        l: true,
        s: true
    }
    var newtext = new StringBuild("");
    for (var i = 0; i < text.length; i ++) {
var char = text.charAt(i)
if (k.indexOf(char) != -1 && (text.charAt(i-1) != char || map[char])) newtext.append(char)
    }
    
    return newtext.toString()
}
checkIfOkay(text) { 
    
    var watch = "";
    var seq = 0;
    var chance = 3;
    var nonchance = 3
    var co = 0;
    var index = 0;
    var fo = 0;
    if (text) text = text.toLowerCase()
    text = escape(text)
    var fir = []
    
    for (var i = 0; i < list.length; i ++) fir.push(list[i].word.charAt(0))
    for (var i = 0; i < text.length; i ++) {
        var ch = text.charAt(i)
       if (watch) {
         var c = watch.charAt(seq)
         
         if (seq >= watch.length - 1) {
             return {word: watch,index:index,ind:ind};
         }
           if (ch == c) {
               seq ++;
               co = 0;
               continue;
           }
           if (co >= chance || fo >= nonchance) {
               watch = "";
               i = ind
               fo = 0;
               co = 0;
               continue;
           }
           co ++;
           if (co == 1) fo ++;
           continue;
       } 
        
        var ind = fir.indexOf(ch,ind + 1)
        if (ind != -1) {
            fo = 0;
            index = i;
            watch = list[ind].word
            seq = 1;
        }
    
        
        
    }
    return false
}
}
