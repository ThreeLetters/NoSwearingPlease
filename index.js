var hardSounds = "b,c,d,f,g,h,j,k,m,n,p,q,s,t,u,v,w,x,y,z".split(",")
var modifyingSounds = "l,r".split(",")

var dict = {
    "a": ["á", "â", "ã", "à"],
    "c": ["ç"],
    "e": ["é", "ê"],
    "i": ["í"],
    "o": ["ó", "ô", "õ", "ú"],
    "u": ["ú", "ü"],
    "n": ["ñ"]
}
var convertMap = new Map();
for (var to in dict) {
    dict[to].forEach((item) => {
        convertMap.set(item, to)
    })
}

function convert(str) {
    return str.split("").map((char) => {
        return convertMap.has(char) ? convertMap.get(char) : char;
    }).join('')
}

var file = JSON.parse(require("fs").readFileSync(__dirname + "/swears.json", "utf8"));
var list = [];
for (var swear in file) {
    list.push({
        word: convert(swear.toLowerCase()),
        wordOriginal: swear,
        info: file[swear]
    });
}

list.sort(function (a, b) {
    return b.word.length - a.word.length;
})

function escape(text) { // Removes non-letters and duplicated

    var keys = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";

    var k = keys.split(",")
    var exceptions = { // Exceptions to duplicate removal. Like, fuuuuck turns into fuck, but nigger doesnt get turned to niger
        r: true,
        b: true,
        d: true,
        e: true,
        g: true,
        l: true,
        s: true,
        p: true
    }


    text = text.split("")

    text = text.map((char) => {
        return k.indexOf(char) != -1 ? char : " ";
    })
    var posmap = [];
    var lastException = false;
    return [text.filter((char, i) => {
        if (text[i - 1] != char || (exceptions[char] && text[i - 2] != char)) {

            posmap.push(i);
            return true;
        } else {
            return false;
        }
    }).join(""), posmap];
}
var vowels = [
    "a", "e", "i", "o", "u"
]

function isVowel(char) {
    return char == "a" || char == "e" || char == "i" || char == "o" || char == "u";
}

function isHard(char) {
    return hardSounds.indexOf(char) != -1
}

function isModifying(char) {
    return modifyingSounds.indexOf(char) != -1
}

var swapTable = {
    o: ["a"]
}

function canSwapVowel(from, to) {
    if (!swapTable[from]) return false;
    return swapTable[from].indexOf(to) != -1;
}

function countSyllables(word) {
    word = word.toLowerCase(); //word.downcase!
    if (word.length <= 3) {
        return 1;
    } //return 1 if word.length <= 3
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, ''); //word.sub!(/^y/, '')
    var match = word.match(/[aeiouy]{1,2}/g);
    return match ? match.length : 0;
}
module.exports = function check(input) {

    var watch = null; // Possible swear
    var seq = 0; // length of detection i guess?
    var chance = 3; // Max deviations in letter position of swear (eg: fucABCk will be caught, but not fucABCDk)
    var nonchance = 3 // Dont know. something about max deviations (eg: nAiBgCger will get caught, but not nAiBgCgDer)
    var co = 0; // Deviations from swear???
    var index = 0; // Where the swear was detected???
    var fo = 0; // more deviation shit
    var ind = -1;

    var t = escape(input.toLowerCase());
    var text = convert(t[0]);
    var posmap = t[1];

    var deviations = 0;

    var fir = []; // List of first characters of swear words

    for (var i = 0; i < list.length; i++) fir.push(list[i].word.charAt(0));

    var detected = [];

    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i)
        if (watch) {
            var c = watch.word.charAt(seq)
            //console.log(watch.word, ch, c, watch.word.charAt(seq + 1))
            if (ch == c || (seq < watch.word.length && (watch.word.charAt(seq - 1) === c || (isVowel(c) && (!isVowel(ch) || canSwapVowel(c, ch)) && !isModifying(ch))) && ch == watch.word.charAt(seq + 1))) {
                seq++;
                if (ch != c) {
                    co++;
                    deviations++;
                    if (co == 1) fo++;
                    seq++;
                }
                co = 0;
                if (seq >= watch.word.length) {

                    if ((i + 1 >= text.length || text.charAt(i + 1) == " ") && countSyllables(text.substring(index, i + 1)) <= countSyllables(watch.word)) {
                        detected.push({
                            original: input.substring(posmap[index], posmap[i] + 1),
                            word: watch.wordOriginal,
                            deviations: deviations,
                            info: watch.info,
                            start: posmap[index],
                            end: posmap[i] + 1
                        });
                    }
                    watch = null;
                    fo = co = 0;
                    i = index - 1;
                }
            } else
            if (co >= chance || fo >= nonchance || isModifying(ch) || isModifying(c) || (isVowel(c) && isVowel(ch) && !canSwapVowel(c, ch))) {
                watch = null;
                i = index - 1;
                fo = 0;
                co = 0;
            } else {
                co++;
                deviations++;
                if (co == 1) fo++;
            }
            if (i + 1 >= text.length) {
                watch = null;
                fo = co = 0;
                i = index - 1;
            }
        } else if (i == 0 || text.charAt(i - 1) == " ") {
            ind = fir.indexOf(ch, ind + 1)
            if (ind != -1) {
                fo = 0;
                index = i;
                watch = list[ind];
                deviations = 0;
                seq = 1;
            }
        }

    }
    return detected;
}