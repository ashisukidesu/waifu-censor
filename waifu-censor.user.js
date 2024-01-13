// ==UserScript==
// @name         waifu-censor
// @namespace    waifu-censor
// @version      2024-01-13
// @description  try to take over the world!
// @author       yotsugi-anon
// @match        *://*/*
// @updateURL    https://github.com/ashisukidesu/waifu-censor/raw/main/waifu-censor.user.js
// @downloadURL  https://github.com/ashisukidesu/waifu-censor/raw/main/waifu-censor.user.js
// @icon         https://files.catbox.moe/00rt8r.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const page = document.documentElement.innerHTML;
    
    // add terms/names to censor in this array. Will add a config windows soon if possible
    const wives = ["frieren", "miyako", "Origami_Tobiichi", "Origami Tobiichi", "tobiichi", "tobiichi_origami", 
                   "koneko_toujou", "koneko", "toujou", "toujou_koneko" ]; 



function buildMatch(wives) {

    let pattern = ""

    for(let i = 0; i < wives.length; i++) {

        pattern = pattern + "(" + wives[i] + ")|";
    }

    pattern = pattern.slice(0, -1)

    return new RegExp(pattern, 'i'); //case-insensitive
}

function censors(regex) {

    let found = page.search(regex);

    if(found != -1) {

        document.body.innerHTML = '<body></body>';
        let imgurl = "https://files.catbox.moe/4cr90o.png"
        let blocked = document.createElement("img");
        blocked.setAttribute("src", imgurl);
        document.body.appendChild(blocked);

    }

}


let regex = buildMatch(wives);
censors(regex);


})();
