(function (scope) {

    var hardSounds = "b,c,d,f,g,j,k,p,q,s,t,u,v,w,x,z".split(",")
    var preModifiers = "s".split(",")
    var modifyingSounds = "l,r,y,m,n".split(",") // had and hand makes different sounds
    var dict = {
        "a": ["á", "â", "ã", "à", "ᗩ", "A", "ⓐ", "Ⓐ", "α", "͏", "₳", "ä", "Ä", "Ꮧ", "λ", "Δ", "Ḁ", "Ꭺ", "ǟ", "̾", "ａ", "Ａ", "ᴀ", "ɐ", "🅐", "𝐚", "𝐀", "𝘢", "𝘈", "𝙖", "𝘼", "𝒶", "𝓪", "𝓐", "𝕒", "𝔸", "𝔞", "𝔄", "𝖆", "𝕬", "🄰", "🅰", "𝒜", "𝚊", "𝙰", "ꍏ"],
        "b": ["ᗷ", "B", "ⓑ", "Ⓑ", "в", "฿", "ḅ", "Ḅ", "Ᏸ", "ϐ", "Ɓ", "ḃ", "Ḃ", "ɮ", "ｂ", "Ｂ", "ʙ", "🅑", "𝐛", "𝐁", "𝘣", "𝘉", "𝙗", "𝘽", "𝒷", "𝓫", "𝓑", "𝕓", "𝔹", "𝔟", "𝔅", "𝖇", "𝕭", "🄱", "🅱", "𝐵", "Ⴆ", "𝚋", "𝙱", "♭"],
        "c": ["ç", "ᑕ", "C", "ⓒ", "Ⓒ", "¢", "͏", "₵", "ċ", "Ċ", "ፈ", "ς", "ḉ", "Ḉ", "Ꮯ", "ƈ", "̾", "ｃ", "Ｃ", "ᴄ", "ɔ", "🅒", "𝐜", "𝐂", "𝘤", "𝘊", "𝙘", "𝘾", "𝒸", "𝓬", "𝓒", "𝕔", "ℂ", "𝔠", "ℭ", "𝖈", "𝕮", "🄲", "🅲", "𝒞", "𝚌", "𝙲", "☾"],
        "d": ["ᗪ", "D", "ⓓ", "Ⓓ", "∂", "Đ", "ď", "Ď", "Ꮄ", "Ḋ", "Ꭰ", "ɖ", "ｄ", "Ｄ", "ᴅ", "🅓", "𝐝", "𝐃", "𝘥", "𝘋", "𝙙", "𝘿", "𝒹", "𝓭", "𝓓", "𝕕", "​", "𝔡", "𝖉", "𝕯", "🄳", "🅳", "𝒟", "ԃ", "𝚍", "𝙳", "◗"],
        "e": ["é", "ê", "E", "ⓔ", "Ⓔ", "є", "͏", "Ɇ", "ệ", "Ệ", "Ꮛ", "ε", "Σ", "ḕ", "Ḕ", "Ꭼ", "ɛ", "̾", "ｅ", "Ｅ", "ᴇ", "ǝ", "🅔", "𝐞", "𝐄", "𝘦", "𝘌", "𝙚", "𝙀", "ℯ", "𝓮", "𝓔", "𝕖", "𝔻", "𝔢", "𝔇", "𝖊", "𝕰", "🄴", "🅴", "𝑒", "𝐸", "ҽ", "𝚎", "𝙴", "€"],
        "f": ["ᖴ", "F", "ⓕ", "Ⓕ", "₣", "ḟ", "Ḟ", "Ꭶ", "ғ", "ʄ", "ｆ", "Ｆ", "ɟ", "🅕", "𝐟", "𝐅", "𝘧", "𝘍", "𝙛", "𝙁", "𝒻", "𝓯", "𝓕", "𝕗", "𝔼", "𝔣", "𝔈", "𝖋", "𝕱", "🄵", "🅵", "𝐹", "ϝ", "𝚏", "𝙵", "Ϝ"],
        "g": ["G", "ⓖ", "Ⓖ", "͏", "₲", "ġ", "Ġ", "Ꮆ", "ϑ", "Ḡ", "ɢ", "̾", "ｇ", "Ｇ", "ƃ", "🅖", "𝐠", "𝐆", "𝘨", "𝘎", "𝙜", "𝙂", "ℊ", "𝓰", "𝓖", "𝕘", "𝔽", "𝔤", "𝔉", "𝖌", "𝕲", "🄶", "🅶", "𝑔", "𝒢", "ɠ", "𝚐", "𝙶", "❡"],
        "h": ["ᕼ", "H", "ⓗ", "Ⓗ", "н", "Ⱨ", "ḧ", "Ḧ", "Ꮒ", "ɦ", "ｈ", "Ｈ", "ʜ", "ɥ", "🅗", "𝐡", "𝐇", "𝘩", "𝘏", "𝙝", "𝙃", "𝒽", "𝓱", "𝓗", "𝕙", "𝔾", "𝔥", "𝔊", "𝖍", "𝕳", "🄷", "🅷", "𝐻", "ԋ", "𝚑", "𝙷", "♄"],
        "i": ["í", "I", "ⓘ", "Ⓘ", "ι", "͏", "ł", "ï", "Ï", "Ꭵ", "ḭ", "Ḭ", "ɨ", "̾", "ｉ", "Ｉ", "ɪ", "ı", "🅘", "𝐢", "𝐈", "𝘪", "𝘐", "𝙞", "𝙄", "𝒾", "𝓲", "𝓘", "𝕚", "ℍ", "𝔦", "ℌ", "𝖎", "𝕴", "🄸", "🅸", "𝐼", "𝚒", "𝙸", "♗"],
        "j": ["ᒍ", "J", "ⓙ", "Ⓙ", "נ", "Ꮰ", "ϳ", "ʝ", "ｊ", "Ｊ", "ᴊ", "ɾ", "🅙", "𝐣", "𝐉", "𝘫", "𝘑", "𝙟", "𝙅", "𝒿", "𝓳", "𝓙", "𝕛", "​", "𝔧", "𝖏", "𝕵", "🄹", "🅹", "𝒥", "𝚓", "𝙹", "♪"],
        "k": ["K", "ⓚ", "Ⓚ", "к", "͏", "₭", "ḳ", "Ḳ", "Ꮶ", "κ", "Ƙ", "ӄ", "̾", "ｋ", "Ｋ", "ᴋ", "ʞ", "🅚", "𝐤", "𝐊", "𝘬", "𝘒", "𝙠", "𝙆", "𝓀", "𝓴", "𝓚", "𝕜", "𝕀", "𝔨", "ℑ", "𝖐", "𝕶", "🄺", "🅺", "𝒦", "ƙ", "𝚔", "𝙺", "ϰ"],
        "l": ["ᒪ", "L", "ⓛ", "Ⓛ", "ℓ", "Ⱡ", "ŀ", "Ŀ", "Ꮭ", "Ḷ", "Ꮮ", "ʟ", "ｌ", "Ｌ", "🅛", "𝐥", "𝐋", "𝘭", "𝘓", "𝙡", "𝙇", "𝓁", "𝓵", "𝓛", "𝕝", "𝕁", "𝔩", "​", "𝖑", "𝕷", "🄻", "🅻", "𝐿", "ʅ", "𝚕", "𝙻", "↳"],
        "m": ["ᗰ", "M", "ⓜ", "Ⓜ", "м", "͏", "₥", "ṃ", "Ṃ", "Ꮇ", "ϻ", "Μ", "ṁ", "Ṁ", "ʍ", "̾", "ｍ", "Ｍ", "ᴍ", "ɯ", "🅜", "𝐦", "𝐌", "𝘮", "𝘔", "𝙢", "𝙈", "𝓂", "𝓶", "𝓜", "𝕞", "𝕂", "𝔪", "𝔍", "𝖒", "𝕸", "🄼", "🅼", "𝑀", "ɱ", "𝚖", "𝙼", "♔"],
        "n": ["ñ", "ᑎ", "N", "ⓝ", "Ⓝ", "и", "₦", "ń", "Ń", "Ꮑ", "π", "∏", "Ṇ", "ռ", "ｎ", "Ｎ", "ɴ", "🅝", "𝐧", "𝐍", "𝘯", "𝘕", "𝙣", "𝙉", "𝓃", "𝓷", "𝓝", "𝕟", "𝕃", "𝔫", "𝔎", "𝖓", "𝕹", "🄽", "🅽", "𝒩", "ɳ", "𝚗", "𝙽", "♫"],
        "o": ["ó", "ô", "õ", "ú", "O", "ⓞ", "Ⓞ", "σ", "͏", "Ø", "ö", "Ö", "Ꭷ", "Θ", "ṏ", "Ṏ", "Ꮎ", "օ", "̾", "ｏ", "Ｏ", "ᴏ", "🅞", "𝐨", "𝐎", "𝘰", "𝘖", "𝙤", "𝙊", "ℴ", "𝓸", "𝓞", "𝕠", "𝕄", "𝔬", "𝔏", "𝖔", "𝕺", "🄾", "🅾", "𝑜", "𝒪", "𝚘", "𝙾", "⊙"],
        "p": ["ᑭ", "P", "ⓟ", "Ⓟ", "ρ", "₱", "ṗ", "Ṗ", "Ꭾ", "Ƥ", "Ꮲ", "ք", "ｐ", "Ｐ", "ᴘ", "🅟", "𝐩", "𝐏", "𝘱", "𝘗", "𝙥", "𝙋", "𝓅", "𝓹", "𝓟", "𝕡", "ℕ", "𝔭", "𝔐", "𝖕", "𝕻", "🄿", "🅿", "𝒫", "𝚙", "𝙿"],
        "q": ["ᑫ", "Q", "ⓠ", "Ⓠ", "͏", "Ꭴ", "φ", "Ⴓ", "զ", "̾", "ｑ", "Ｑ", "ϙ", "ǫ", "🅠", "𝐪", "𝐐", "𝘲", "𝘘", "𝙦", "𝙌", "𝓆", "𝓺", "𝓠", "𝕢", "​", "𝔮", "𝔑", "𝖖", "𝕼", "🅀", "🆀", "𝒬", "𝚚", "𝚀", "☭"],
        "r": ["ᖇ", "R", "ⓡ", "Ⓡ", "я", "Ɽ", "ŕ", "Ŕ", "Ꮢ", "г", "Γ", "ṙ", "Ṙ", "ʀ", "ｒ", "Ｒ", "ɹ", "🅡", "𝐫", "𝐑", "𝘳", "𝘙", "𝙧", "𝙍", "𝓇", "𝓻", "𝓡", "𝕣", "𝕆", "𝔯", "𝔒", "𝖗", "𝕽", "🅁", "🆁", "𝑅", "ɾ", "𝚛", "𝚁", "☈"],
        "s": ["ᔕ", "S", "ⓢ", "Ⓢ", "ѕ", "͏", "₴", "ṩ", "Ṩ", "Ꮥ", "Ѕ", "Ṡ", "ֆ", "̾", "ｓ", "Ｓ", "ꜱ", "🅢", "𝐬", "𝐒", "𝘴", "𝘚", "𝙨", "𝙎", "𝓈", "𝓼", "𝓢", "𝕤", "ℙ", "𝔰", "𝔓", "𝖘", "𝕾", "🅂", "🆂", "𝒮", "ʂ", "𝚜", "𝚂"],
        "t": ["T", "ⓣ", "Ⓣ", "т", "₮", "ẗ", "Ṯ", "Ꮦ", "τ", "Ƭ", "Ꮖ", "ȶ", "ｔ", "Ｔ", "ᴛ", "ʇ", "🅣", "𝐭", "𝐓", "𝘵", "𝘛", "𝙩", "𝙏", "𝓉", "𝓽", "𝓣", "𝕥", "​", "𝔱", "𝔔", "𝖙", "𝕿", "🅃", "🆃", "𝒯", "ƚ", "𝚝", "𝚃", "☂"],
        "u": ["ú", "ü", "ᑌ", "U", "ⓤ", "Ⓤ", "υ", "͏", "Ʉ", "Ü", "Ꮼ", "Ʊ", "ṳ", "Ṳ", "ʊ", "̾", "ｕ", "Ｕ", "ᴜ", "🅤", "𝐮", "𝐔", "𝘶", "𝘜", "𝙪", "𝙐", "𝓊", "𝓾", "𝓤", "𝕦", "ℚ", "𝔲", "ℜ", "𝖚", "𝖀", "🅄", "🆄", "𝒰", "𝚞", "𝚄", "☋"],
        "v": ["ᐯ", "V", "ⓥ", "Ⓥ", "ν", "ṿ", "Ṿ", "Ꮙ", "Ʋ", "Ṽ", "ʋ", "ｖ", "Ｖ", "ᴠ", "ʌ", "🅥", "𝐯", "𝐕", "𝘷", "𝘝", "𝙫", "𝙑", "𝓋", "𝓿", "𝓥", "𝕧", "​", "𝔳", "𝖛", "𝖁", "🅅", "🆅", "𝒱", "𝚟", "𝚅", "✓"],
        "w": ["ᗯ", "W", "ⓦ", "Ⓦ", "ω", "͏", "₩", "ẅ", "Ẅ", "Ꮗ", "ш", "Ш", "ẇ", "Ẇ", "Ꮃ", "ա", "̾", "ｗ", "Ｗ", "ᴡ", "ʍ", "🅦", "𝐰", "𝐖", "𝘸", "𝘞", "𝙬", "𝙒", "𝓌", "𝔀", "𝓦", "𝕨", "ℝ", "𝔴", "𝔖", "𝖜", "𝖂", "🅆", "🆆", "𝒲", "ɯ", "𝚠", "𝚆"],
        "x": ["᙭", "X", "ⓧ", "Ⓧ", "χ", "Ӿ", "ẍ", "Ẍ", "ጀ", "ϰ", "Ж", "х", "Ӽ", "ｘ", "Ｘ", "🅧", "𝐱", "𝐗", "𝘹", "𝘟", "𝙭", "𝙓", "𝓍", "𝔁", "𝓧", "𝕩", "​", "𝔵", "𝔗", "𝖝", "𝖃", "🅇", "🆇", "𝒳", "𝚡", "𝚇", "⌘"],
        "y": ["Y", "ⓨ", "Ⓨ", "у", "͏", "Ɏ", "ÿ", "Ÿ", "Ꭹ", "ψ", "Ψ", "ẏ", "Ẏ", "Ꮍ", "ч", "ʏ", "̾", "ｙ", "Ｙ", "ʎ", "🅨", "𝐲", "𝐘", "𝘺", "𝘠", "𝙮", "𝙔", "𝓎", "𝔂", "𝓨", "𝕪", "𝕊", "𝔶", "𝔘", "𝖞", "𝖄", "🅈", "🆈", "𝒴", "ყ", "𝚢", "𝚈", "☿"],
        "z": ["ᘔ", "Z", "ⓩ", "Ⓩ", "Ⱬ", "ẓ", "Ẓ", "ፚ", "Ꮓ", "ʐ", "ｚ", "Ｚ", "ᴢ", "🅩", "𝐳", "𝐙", "𝘻", "𝘡", "𝙯", "𝙕", "𝓏", "𝔃", "𝓩", "𝕫", "𝕋", "𝔷", "𝔙", "𝖟", "𝖅", "🅉", "🆉", "𝒵", "ȥ", "𝚣", "𝚉", "☡"]
    }

    var vowels = [
        "a", "e", "i", "o", "u" // , "y" - Y only sometimes
    ]
    var combinedHSounds = [
        "c", "t", "s", "w"
    ]
    var distinctCombinedVowels = {
        a: ["o", "e"],
        i: ["a", "e", "o", "u"],
        e: ["i"],
        o: ["e", "o"],
        u: ["a", "o"]
    }


    var convertMap = new Map();
    for (var to in dict) {
        dict[to].forEach((item) => {
            convertMap.set(item, to)
        })
    }

    var swapTable = {
        o: ["a"],
        u: ["o"],
        i: ["e", "a"]
    }

    function canSwapVowel(from, to) {
        if (!swapTable[from]) return false;
        return swapTable[from].indexOf(to) != -1;
    }

    function vowelDistinct(last, first) {
        return distinctCombinedVowels[last].indexOf(first) != -1;
    }

    function isVowel(char) {
        return vowels.indexOf(char) != -1;
    }

    function isHard(char) {
        return hardSounds.indexOf(char) != -1
    }

    function isModifying(char) {
        return modifyingSounds.indexOf(char) != -1
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

    class NoSwearing {
        constructor(swearList) {
            this.list = [];
            if (swearList) this.addSwears(swearList)
        }
        convert(str) {
            return Array.from(str).map((char) => {
                return convertMap.has(char) ? convertMap.get(char) : char;
            }).join('').toLowerCase();
        }
        escape(text) {
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
                p: true,
                s: true
            }


            text = text.split("")

            text = text.map((char) => {
                return k.indexOf(char) != -1 ? char : " ";
            })

            var posmap = [];
            return [text.filter((char, i) => {
                if ((text[i - 1] != char || (exceptions[char] && text[i - 2] != char))) {

                    posmap.push(i);
                    return true;
                } else {
                    return false;
                }
            }).join(""), posmap];
        }
        addSwears(swearList) {
            for (var swear in swearList) {
                this.list.push({
                    word: this.convert(swear),
                    wordOriginal: swear,
                    info: swearList[swear]
                });
            }
        }
        check(input) {

            var watch = null; // Possible swear
            var seq = 0; // length of detection i guess?
            var chance = 3; // Max deviations in letter position of swear (eg: fucABCk will be caught, but not fucABCDk)
            var nonchance = 3 // Dont know. something about max deviations (eg: nAiBgCger will get caught, but not nAiBgCgDer)
            var co = 0; // Deviations from swear???
            var index = 0; // Where the swear was detected???
            var fo = 0; // more deviation shit
            var ind = -1;

            var inputArr = Array.from(input)
            var t = this.escape(this.convert(input));
            var text = t[0];
            var posmap = t[1];
            var deviations = 0;

            //console.log(text)
            var fir = []; // List of first characters of swear words

            for (var i = 0; i < this.list.length; i++) fir.push(this.list[i].word.charAt(0));

            var detected = [];

            for (var i = 0; i < text.length; i++) {
                var ch = text.charAt(i)
                if (watch) {

                    var c = watch.word.charAt(seq)
                    //console.log(watch.word, ch, c, watch.word.charAt(seq + 1))
                    if (ch == c || (seq < watch.word.length && (
                                (c == "h" && combinedHSounds.indexOf(watch.word.charAt(seq - 1)) == -1) || // Silent h can be removed
                                (isVowel(c) && !vowelDistinct(c, watch.word.charAt(seq - 1)) && (isVowel(ch) ? canSwapVowel(c, ch) : isHard(ch)))) && // Vowels can be removed or swapped, if its swapped with hard sounds
                            ch == watch.word.charAt(seq + 1))) {


                        if (ch != c ||
                            (watch.word.charAt(seq + 1) === c && text.charAt(i + 1) != c && c != "s") // Double letters can be removed if its not s. Because "as" doesnt dount like "ass"
                        ) {
                            // console.log(watch.word, ch, c, watch.word.charAt(seq + 1))
                            co++;
                            deviations++;
                            // if (co == 1) fo++;
                            seq++;
                        }
                        seq++;
                        co = 0;
                        if (seq >= watch.word.length) {

                            if (
                                (!isModifying(text.charAt(i)) || !isHard(text.charAt(i + 1))) && // if char is not ending with l,r but has a consonent at the end
                                (i + 1 >= text.length || !isVowel(text.charAt(i + 1))) && // Next char must not be vowel
                                countSyllables(text.substring(index, i + 1)) <= countSyllables(watch.word) // Syllables must not be less than text
                            ) {
                                detected.push({
                                    original: inputArr.slice(posmap[index], posmap[i] + 1).join(""),
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
                    if (co >= chance || fo >= nonchance || // Stop when deviations are too big
                        isModifying(ch) || isModifying(c) || // If the deviations are due to modifiers (r and l), then stop
                        (isVowel(c) && isVowel(ch) && !canSwapVowel(c, ch)) || // Stop if unswappable vowels
                        (isVowel(c) && vowelDistinct(c, watch.word.charAt(seq - 1))) || // Stop if important vowel is missing
                        (isVowel(c) && isHard(ch)) ||
                        (isHard(c) && isVowel(ch))
                    ) {
                        watch = null;
                        i = index - 1;
                        fo = 0;
                        co = 0;
                    } else {
                        co++;
                        deviations++;
                        // if (co == 1) fo++;
                    }
                    if (i + 1 >= text.length) {
                        watch = null;
                        fo = co = 0;
                        i = index - 1;
                    }
                } else if (i == 0 || text.charAt(i - 1) == " " ||
                    ((text.charAt(i) != "h" || combinedHSounds.indexOf(text.charAt(i - 1)) == -1) &&
                        !isVowel(text.charAt(i - 1)) && preModifiers.indexOf(text.charAt(i - 1)) == -1 && isHard(text.charAt(i)))) { // 
                    ind = fir.indexOf(ch, ind + 1)
                    if (ind != -1) {
                        fo = 0;
                        index = i;
                        watch = this.list[ind];
                        deviations = 0;
                        seq = 1;
                    }
                }
            }
            detected.sort((a, b) => {
                return a.deviations !== b.deviations ? a.deviations - b.deviations : b.word.length - a.word.length;
            });
            return detected;
        }
    }

    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        var noSwearing = new NoSwearing(JSON.parse(require("fs").readFileSync(__dirname + "/swears.json", "utf8")));
        module.exports = function (text) {
            return noSwearing.check(text);
        }
        module.exports.NoSwearing = NoSwearing;
        module.exports.noSwearing = noSwearing;
    } else {
        scope.NoSwearing = NoSwearing;
    }
})(this);