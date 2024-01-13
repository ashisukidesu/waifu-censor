// ==UserScript==
// @name         waifu-censor
// @namespace    waifu-censor
// @version      2024-01-13
// @description  try to take over the world!
// @author       yotsugi-anon
// @match        *://*/*
// @icon         https://files.catbox.moe/00rt8r.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const page = document.documentElement.innerHTML;

    const wives = ["frieren", "miyako"];


function buildMatch(wives) {

    let regex = "";

    for(let i = 0; i < wives.length; i++) {

        regex = regex + "(" + wives[i] + ")|";
    }

    regex = regex.slice(0, -1)

    return regex;
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