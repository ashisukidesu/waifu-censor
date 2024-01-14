// ==UserScript==
// @name         waifu-censor
// @namespace    waifu-censor
// @version      0.5.3
// @description  Make sure to respect your friend's waifu harem by block access to content exposing their wives~ 
// @author       yotsugi-anon
// @match        *://*/*
// @icon         https://files.catbox.moe/00rt8r.png
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// ==/UserScript==

 /* Popup container */
 let cssPopup = `.popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  /* The actual popup (appears on top) */
  .popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
  }
  
  /* Popup arrow */
  .popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
  
  /* Toggle this class when clicking on the popup container (hide and show the popup) */
  .popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s
  }
  
  /* Add animation (fade in the popup) */
  @-webkit-keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  
  @keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
  }`

//config menu WIP
(function() {
    'use strict';


    function config_menu() {

        let popup = '<div class="popup" onclick="myFunction()">Click me!<span class="popuptext" id="myPopup">Popup text...</span></div>'
        GM_addStyle(cssPopup);
        document.body.appendChild(popup);
        popup.classList.toggle("show");
        
    }

    
    const menu_command_id_1 = GM_registerMenuCommand("Show Alert", function(event) {
        config_menu();
      }, {
        accessKey: "a",
        autoClose: true
      });
      


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
