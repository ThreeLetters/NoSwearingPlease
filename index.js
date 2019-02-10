var list = JSON.parse(require("fs").readFileSync(__dirname + "/swears.json", "utf8"));
list.sort(function(a, b) {
    return b.length - a.length;
})

function escape(text) { // Removes non-letters and duplicated

    var keys = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";

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



    return text.split("").map((char) => {
        return k.indexOf(char) != -1 ? char : " ";
    }).filter((char, i) => {
        return text[i - 1] != char || exceptions[char];
    }).join("");
}


module.exports = function check(text) {

    var watch = ""; // Possible swear
    var seq = 0; // length of detection i guess?
    var chance = 3; // Max deviations in letter position of swear (eg: fucABCk will be caught, but not fucABCDk)
    var nonchance = 3 // Dont know. something about max deviations (eg: nAiBgCger will get caught, but not nAiBgCgDer)
    var co = 0; // Deviations from swear???
    var index = 0; // Where the swear was detected???
    var fo = 0; // more deviation shit
    var ind = -1;

    if (text) text = text.toLowerCase()
    text = escape(text)


    var fir = []; // List of first characters of swear words

    for (var i = 0; i < list.length; i++) fir.push(list[i].charAt(0));

    var detected = [];

    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i)
        if (watch.length) {
            var c = watch.charAt(seq)


            if (ch == c) {
                seq++;
                co = 0;
                if (seq >= watch.length) {
                    detected.push({
                        word: watch,
                        start: index,
                        end: i + 1
                    });
                    watch = "";
                    fo = co = 0;
                }
            } else
            if (co >= chance || fo >= nonchance) {
                watch = "";
                i = index;
                fo = 0;
                co = 0;
            } else {
                co++;
                if (co == 1) fo++;
            }
        } else if (i == 0 || text.charAt(i - 1) == " ") {
            ind = fir.indexOf(ch, ind + 1)
            if (ind != -1) {
                fo = 0;
                index = i;
                watch = list[ind];
                seq = 1;
            }
        }

    }
    return detected;
}
