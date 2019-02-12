(function (scope) {

    var hardSounds = "b,c,d,f,g,j,k,p,q,s,t,u,v,w,x,z".split(",")
    var preModifiers = "s".split(",") // sp
    var modifyingSounds = "l,r,y,m,n,s".split(",") // had and hand makes different sounds
    var dict = {
        "a": ["@", "á", "â", "ã", "à", "ᗩ", "A", "ⓐ", "Ⓐ", "α", "͏", "₳", "ä", "Ä", "Ꮧ", "λ", "Δ", "Ḁ", "Ꭺ", "ǟ", "̾", "ａ", "Ａ", "ᴀ", "ɐ", "🅐", "𝐚", "𝐀", "𝘢", "𝘈", "𝙖", "𝘼", "𝒶", "𝓪", "𝓐", "𝕒", "𝔸", "𝔞", "𝔄", "𝖆", "𝕬", "🄰", "🅰", "𝒜", "𝚊", "𝙰", "ꍏ"],
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
        "l": ["1", "/", "|", "ᒪ", "L", "ⓛ", "Ⓛ", "ℓ", "Ⱡ", "ŀ", "Ŀ", "Ꮭ", "Ḷ", "Ꮮ", "ʟ", "ｌ", "Ｌ", "🅛", "𝐥", "𝐋", "𝘭", "𝘓", "𝙡", "𝙇", "𝓁", "𝓵", "𝓛", "𝕝", "𝕁", "𝔩", "​", "𝖑", "𝕷", "🄻", "🅻", "𝐿", "ʅ", "𝚕", "𝙻", "↳"],
        "m": ["ᗰ", "M", "ⓜ", "Ⓜ", "м", "͏", "₥", "ṃ", "Ṃ", "Ꮇ", "ϻ", "Μ", "ṁ", "Ṁ", "ʍ", "̾", "ｍ", "Ｍ", "ᴍ", "ɯ", "🅜", "𝐦", "𝐌", "𝘮", "𝘔", "𝙢", "𝙈", "𝓂", "𝓶", "𝓜", "𝕞", "𝕂", "𝔪", "𝔍", "𝖒", "𝕸", "🄼", "🅼", "𝑀", "ɱ", "𝚖", "𝙼", "♔"],
        "n": ["ñ", "ᑎ", "N", "ⓝ", "Ⓝ", "и", "₦", "ń", "Ń", "Ꮑ", "π", "∏", "Ṇ", "ռ", "ｎ", "Ｎ", "ɴ", "🅝", "𝐧", "𝐍", "𝘯", "𝘕", "𝙣", "𝙉", "𝓃", "𝓷", "𝓝", "𝕟", "𝕃", "𝔫", "𝔎", "𝖓", "𝕹", "🄽", "🅽", "𝒩", "ɳ", "𝚗", "𝙽", "♫"],
        "o": ["0", "ó", "ô", "õ", "ú", "O", "ⓞ", "Ⓞ", "σ", "͏", "Ø", "ö", "Ö", "Ꭷ", "Θ", "ṏ", "Ṏ", "Ꮎ", "օ", "̾", "ｏ", "Ｏ", "ᴏ", "🅞", "𝐨", "𝐎", "𝘰", "𝘖", "𝙤", "𝙊", "ℴ", "𝓸", "𝓞", "𝕠", "𝕄", "𝔬", "𝔏", "𝖔", "𝕺", "🄾", "🅾", "𝑜", "𝒪", "𝚘", "𝙾", "⊙"],
        "p": ["ᑭ", "P", "ⓟ", "Ⓟ", "ρ", "₱", "ṗ", "Ṗ", "Ꭾ", "Ƥ", "Ꮲ", "ք", "ｐ", "Ｐ", "ᴘ", "🅟", "𝐩", "𝐏", "𝘱", "𝘗", "𝙥", "𝙋", "𝓅", "𝓹", "𝓟", "𝕡", "ℕ", "𝔭", "𝔐", "𝖕", "𝕻", "🄿", "🅿", "𝒫", "𝚙", "𝙿"],
        "q": ["ᑫ", "Q", "ⓠ", "Ⓠ", "͏", "Ꭴ", "φ", "Ⴓ", "զ", "̾", "ｑ", "Ｑ", "ϙ", "ǫ", "🅠", "𝐪", "𝐐", "𝘲", "𝘘", "𝙦", "𝙌", "𝓆", "𝓺", "𝓠", "𝕢", "​", "𝔮", "𝔑", "𝖖", "𝕼", "🅀", "🆀", "𝒬", "𝚚", "𝚀", "☭"],
        "r": ["ᖇ", "R", "ⓡ", "Ⓡ", "я", "Ɽ", "ŕ", "Ŕ", "Ꮢ", "г", "Γ", "ṙ", "Ṙ", "ʀ", "ｒ", "Ｒ", "ɹ", "🅡", "𝐫", "𝐑", "𝘳", "𝘙", "𝙧", "𝙍", "𝓇", "𝓻", "𝓡", "𝕣", "𝕆", "𝔯", "𝔒", "𝖗", "𝕽", "🅁", "🆁", "𝑅", "ɾ", "𝚛", "𝚁", "☈"],
        "s": ["5", "ᔕ", "S", "ⓢ", "Ⓢ", "ѕ", "͏", "₴", "ṩ", "Ṩ", "Ꮥ", "Ѕ", "Ṡ", "ֆ", "̾", "ｓ", "Ｓ", "ꜱ", "🅢", "𝐬", "𝐒", "𝘴", "𝘚", "𝙨", "𝙎", "𝓈", "𝓼", "𝓢", "𝕤", "ℙ", "𝔰", "𝔓", "𝖘", "𝕾", "🅂", "🆂", "𝒮", "ʂ", "𝚜", "𝚂"],
        "t": ["+", "T", "ⓣ", "Ⓣ", "т", "₮", "ẗ", "Ṯ", "Ꮦ", "τ", "Ƭ", "Ꮖ", "ȶ", "ｔ", "Ｔ", "ᴛ", "ʇ", "🅣", "𝐭", "𝐓", "𝘵", "𝘛", "𝙩", "𝙏", "𝓉", "𝓽", "𝓣", "𝕥", "​", "𝔱", "𝔔", "𝖙", "𝕿", "🅃", "🆃", "𝒯", "ƚ", "𝚝", "𝚃", "☂"],
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

    function isCombinedH(prev, prev2) {
        return prev != prev2 && combinedHSounds.indexOf(prev) != -1;
    }

    var convertMap = new Map();
    for (var to in dict) {
        dict[to].forEach((item) => {
            convertMap.set(item, to)
        })
    }

    var swapTable = {
        //  o: ["a"],
        u: ["o"],
        i: ["e"]
    }

    function canSwapVowel(from, to) {
        if (!swapTable[from]) return false;
        return swapTable[from].indexOf(to) != -1;
    }

    function vowelDistinct(last, first) {
        if (!distinctCombinedVowels[last]) return false;
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

    function canSkip(text, word, wi, i) {

        if (word[wi] == "t" &&
            word[wi + 1] == "c" &&
            word[wi + 2] == "h" &&

            text[i] == "c" &&
            text[i + 1] == "h") { // tch can become ch
            return 2;
        }

        if (
            (
                (
                    word[wi] == "c" && // Looking for c
                    word[wi + 1] == "k"
                ) ||
                (
                    word[wi] == "k"
                ) ||
                (
                    word[wi] == "q"
                ) ||
                (
                    isVowel(word[wi - 1]) &&
                    word[wi] == "c" &&
                    word[wi + 1] != "e"
                )
            ) &&
            (
                text[i] == "k" || // ck can become k
                text[i] == "q" || // ck can becoe q
                (
                    isVowel(text[i - 1]) &&
                    text[i] == "c" && // ck can becoe c
                    text[i + 1] != "e" // c makes a k sound unless if there is an e
                )
            )
        ) {
            return (word[wi] == "c" && // Looking for c
                word[wi + 1] == "k") ? 2 : 1;
        }

        if (word[wi] == text[i]) return 1; // If the same charactor, return true;

        // Silent h can be skipped
        if (word[wi] == "h" && !isCombinedH(word[wi - 1], word[wi - 2])) {
            return ((wi + 1 >= word.length && !isHard(text[i])) || canSkip(text, word, wi + 1, i)) ? 2 : 0;
        }

        if (isVowel(word[wi]) && !vowelDistinct(word[wi], word[wi - 1]) && !vowelDistinct(word[wi + 1], word[wi])) { // Vowels can be replaced/ommited only if they arnt combined like oo
            if (isVowel(text[i])) {
                return canSwapVowel(word[wi], text[i]) ? 1 : 0; // If vowel is swappable with another, like e->i
            } else {
                return (isHard(text[i]) && isHard(word[wi + 1]) && isHard(word[wi - 1]) && word[wi + 1] != word[wi - 1] && wi + 1 < word.length && canSkip(text, word, wi + 1, i)) ? 2 : 0; // Vowel can be ommited sometimes
            }
        }
        return 0;
    }

    class NoSwearing {
        constructor(swearList) {
            this.list = [];
            this.trigger = {};
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
                s: true,
                o: true
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
                    posmap[posmap.length - 1] = i;
                    return false;
                }
            }).join(""), posmap];
        }
        addSwears(swearList) {
            for (var swear in swearList) {
                this.list.push({
                    word: this.escape(this.convert(swear))[0],
                    wordOriginal: swear,
                    info: swearList[swear]
                });
            }
            this.list.sort((a, b) => {
                return b.word.length - a.word.length;
            });
            this.trigger = {};

            for (var i = 0; i < this.list.length; i++) {
                var char = this.list[i].word.charAt(0);
                if (!this.trigger[char]) this.trigger[char] = [];
                this.trigger[char].push(i);
            }

        }
        check(input) {

            var watch = null; // Possible swear
            //   var wi = 0; // length of detection i guess?
            var wi = 0; // Watching index;
            var chance = 3; // Max deviations in letter position of swear (eg: fucABCk will be caught, but not fucABCDk)
            var nonchance = 3 // Dont know. something about max deviations (eg: nAiBgCger will get caught, but not nAiBgCgDer)
            var co = 0; // Deviations from swear???
            var index = 0; // Where the swear was detected???
            var fo = 0; // more deviation shit
            var ind = 0;

            var inputArr = Array.from(input)
            var t = this.escape(this.convert(input));
            var text = t[0];
            var posmap = t[1];
            var deviations = 0;

            var detected = [];

            for (var i = 0; i < text.length; i++) {
                if (watch) {
                    var word = watch.word;
                    var skipMode = canSkip(text, word, wi, i);
                    // console.log(i, wi, ind, word, text[i], word[wi], canSkip(text, word, wi, i))
                    if (
                        skipMode
                    ) {
                        if (word[wi] != text[i]) deviations++;
                        if (wi + 1 < word.length && word[wi] == word[wi + 1] && text[i + 1] != word[wi] && !isHard(word[wi])) {
                            if (wi + 2 >= word.length || canSkip(text, word, wi + 2, i + 1)) {
                                wi++;
                                deviations++;
                            }
                        }
                        wi++;
                        co = 0;
                        if (wi >= word.length) {
                            if (
                                (!isModifying(text[i]) || !isHard(text[i + 1]) || countSyllables(word) > 1) && // help vs erboy
                                (!isVowel(text[i + 1])) && // Next char must not be vowel - hello 
                                (!isVowel(text[i]) || !isHard(text[i + 1])) && // tested is not teste
                                countSyllables(text.substring(index, i + 1)) <= countSyllables(word) // Syllables must not be less than text
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
                            i = index - 1;
                        } else
                        if (skipMode == 2) {
                            i--;
                        }
                    } else
                    if (co >= chance || // Stop when deviations are too big
                        (
                            text[i] !== " " && // Not if it is a space
                            (
                                // If the deviations are due to modifiers (r and l), then stop, ie fork wont be read as fuck because the r modifier will change the sound of the word
                                isModifying(text[i]) || isModifying(word[i]) ||

                                // Stop if unswappable vowels
                                (isVowel(word[i]) && isVowel(text[i]) && !canSwapVowel(word[i], text[i])) ||

                                // Stop if any combining vowel is missing. Because pound does not sound like pond
                                (isVowel(word[i]) && vowelDistinct(word[i], word.charAt(wi - 1))) ||

                                // Stop if a hard sound
                                isHard(text[i]) || isHard(word[i]) ||

                                // Stop if missing an essential h (sh,th,etc...)
                                (word[wi] == "h" && isCombinedH(word[wi - 1], word[wi - 2])) ||
                                // Stop if there is an extra essential h
                                (text[i] == "h" && isCombinedH(text[i - 1], text[i - 2]))
                            )
                        )
                    ) {
                        watch = null;
                        i = index - 1;
                    } else {
                        co++;
                        deviations++;
                        // if (co == 1) fo++;
                    }
                    if (i + 1 >= text.length) {
                        watch = null;
                        i = index - 1;
                    }
                } else if (
                    // Start of string
                    i == 0 ||

                    // Start of word (space)
                    text[i - 1] == " " ||

                    (
                        // Not a special h sound
                        (text[i] != "h" || !isCombinedH(text[i - 1], text[i - 2])) &&

                        // Not a vowel
                        !isVowel(text[i - 1]) &&

                        // Not a modifier
                        preModifiers.indexOf(text[i - 1]) == -1 &&

                        isHard(text[i]))) { // 
                    if (this.trigger[text[i]]) {
                        if (ind < this.trigger[text[i]].length) {
                            index = i;
                            watch = this.list[this.trigger[text[i]][ind++]];
                            deviations = 0;
                            wi = 1;
                            co = 0;
                            if (watch.word.length == 1 && (watch.word == "i" || watch.word == "a")) {
                                detected.push({
                                    original: text[i],
                                    word: watch.wordOriginal,
                                    deviations: 0,
                                    info: watch.info,
                                    start: posmap[index],
                                    end: posmap[i] + 1
                                });
                                watch = null
                                i--;
                            }

                        } else {
                            ind = 0;
                        }
                    }
                }
            }
            var group = [];
            var groups = [];

            detected.forEach((item, i) => {
                if (i != 0 && item.start == detected[i - 1].start) {

                } else {
                    if (group.length) groups.push(group);
                    group = [];
                }
                item.replacedLen = item.original.replace(/ /g, "").length;
                group.push(item);
            })
            if (group.length) groups.push(group);

            // detected = [];
            groups.forEach((group, ind) => {
                group.sort((a, b) => {
                    var diff = b.original.length - a.original.length;

                    if (diff == 0) diff = a.deviations - b.deviations;
                    return diff;
                });

                groups[ind] = group.filter((a, i) => {
                    return i == 0 || group[i - 1].original.length !== group[i].original.length;
                });

                if (ind < groups.length - 1 && groups[ind][0].end >= groups[ind + 1][0].start)
                    groups[ind].push({
                        original: "",
                        word: "",
                        deviations: 0,
                        start: groups[ind][0].start,
                        end: groups[ind][0].start
                    });

            });
            //            return groups;

            var valueCache = [];
            var s = 0;

            function recurse(i) {

                if (!groups[i]) return;


                var g = groups[i];
                var sum = 0;
                var out = [];
                for (var j = 0; j < g.length; j++) {
                    var word = g[j];
                    var result;
                    var k = i + 1;
                    while (k < groups.length && groups[k][0].start < word.end) k++;
                    if (k < groups.length) {
                        if (valueCache[k] !== undefined) {
                            result = valueCache[k];
                        } else {
                            result = valueCache[k] = recurse(k);
                        }
                    }


                    var d = word.deviations;
                    var l = word.replacedLen

                    if (result) {
                        d += result[0].deviations;
                        l += result[0].length;
                    }
                    var last = out[out.length - 1];
                    if (!last || (l > last.length))
                        out.push({
                            deviations: d,
                            length: l,
                            word: word,
                            result: result
                        })
                }
                out.reverse();
                return out;
            }
            var res = recurse(0);
            if (!res) return [];
            valueCache = [];
            for (var i = 0; i < groups.length; i++) {
                valueCache.push([])
            }

            function recurse3(i, len) {

                if (!groups[i] || len < 0) return;


                var g = groups[i];
                var out = [];
                for (var j = 0; j < g.length; j++) {
                    var word = g[j];
                    var result;
                    var k = i + 1;
                    while (k < groups.length && groups[k][0].start < word.end) k++;

                    var words = 1;
                    var d = word.deviations;
                    var l = word.replacedLen;
                    if (k < groups.length) {
                        if (valueCache[k][len - l] !== undefined) {
                            result = valueCache[k][len - l];
                        } else {
                            result = valueCache[k][len - l] = recurse3(k, len - l);
                        }
                    }

                    if (result && result[0]) {
                        d += result[0].deviations;
                        l += result[0].length;
                        words += result[0].words;
                    }
                    var last = out[out.length - 1];
                    if (len - l == 0 && (!last || (words + d < last.words + last.deviations)))
                        out.push({
                            deviations: d,
                            length: l,
                            words: words,
                            word: word,
                            result: result
                        })
                }
                out.reverse();
                return out;
            }
            var reqlen = res[0].length;
            res = recurse3(0, res[0].length);
            if (!res) return [];
            var out = [];
            // console.log(reqlen)

            function recurse2(dt) {
                if (dt && dt[0]) {
                    out.push(dt[0].word);
                    recurse2(dt[0].result)
                }
            }

            //  require("fs").writeFileSync("out.json", JSON.stringify(res))
            recurse2(res);
            return out;
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