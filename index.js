var list = [{
        "word": "fuck"
    },
    {
        "word": "bitch"
    },
    {
        "word": "nigger"

    },
    {
        "word": "dick"
    },
    {
        "word": "cunt"

    }
]


function escape(text) { // Removes non-letters and duplicated

    var keys = "q w e r t y u i o p a s d f g h j k l z x c v b n m"

    var k = keys.split(" ")
    var exceptions = { // Exceptions to duplicate removal. Like, fuuuuck turns into fuck, but nigger doesnt get turned to niger
        r: true,
        b: true,
        d: true,
        e: true,
        g: true,
        l: true,
        s: true
    }
    var newtext = "";
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i)
        if (k.indexOf(char) != -1 && (text.charAt(i - 1) != char || exceptions[char])) newtext += char;
    }

    return newtext;
}


module.exports = function check(text) {

    var watch = ""; // Possible swear
    var seq = 0; // length of detection i guess?
    var chance = 3; // Max deviations in letter position of swear (eg: fucABCk will be caught, but not fucABCDk)
    var nonchance = 3 // Dont know. something about max deviations (eg: nAiBgCger will get caught, but not nAiBgCgDer)
    var co = 0; // Deviations from swear???
    var index = 0; // Where the swear was detected???
    var fo = 0; // more deviation shit

    if (text) text = text.toLowerCase()
    text = escape(text)
    console.log(text)

    var fir = []; // List of first characters of swear words

    for (var i = 0; i < list.length; i++) fir.push(list[i].word.charAt(0))

    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i)
        if (watch.length) {
            var c = watch.charAt(seq)


            if (ch == c) {
                seq++;
                if (seq >= watch.length) {
                    return {
                        word: watch,
                        start: index,
                        end: i + 1
                    };
                }
                co = 0;
                continue;
            }

            if (co >= chance || fo >= nonchance) {
                watch = "";
                i = index + 1;
                fo = 0;
                co = 0;
                continue;
            }
            co++;
            if (co == 1) fo++;
        } else {
            var ind = fir.indexOf(ch)
            if (ind != -1) {
                fo = 0;
                index = i;
                watch = list[ind].word
                seq = 1;
            }
        }

    }
    return false
}
