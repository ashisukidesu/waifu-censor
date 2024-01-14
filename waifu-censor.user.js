// ==UserScript==
// @name         waifu-censor
// @namespace    waifu-censor
// @version      0.6.0
// @description  Make sure to respect your friend's waifu harem by block access to content exposing their wives~ 
// @author       yotsugi-anon
// @match        *://*/*
// @exclude      *://github.com/*
// @icon         https://files.catbox.moe/00rt8r.png
// @grant        GM_registerMenuCommand
// @grant        GM_listValues
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_getValue
// ==/UserScript==

 /* Popup container */
 
//config menu WIP
(function() {
    'use strict';
    const IMG_CENSOR = "https://files.catbox.moe/4cr90o.png"
    
         
    function add_names(valuesToAdd) {

        let added = [];

        valuesToAdd.forEach( wife => {
            GM_setValue(wife, wife);
            added.push(wife)
        });

        return added;
    }

    function get_names() {
        return GM_listValues();
    }


    function delete_names(valuesToDel) {
        
        let deleted = [];

        valuesToDel.forEach(wife => {

            if(GM_getValue(wife)) {
                GM_deleteValue(wife);
                deleted.push(wife);
            }
        });

        return deleted;
    }

    /********************* MENU *******************************************/
    const menu_command_id_1 = GM_registerMenuCommand("Add Wives to the filter", function(event) {

        let result = prompt("Enter the wives to filter separated by: | ");
        let valuesToAdd = result.split('|');
        let names = add_names(valuesToAdd);

        alert("Successfully added : \n" + names.toString());

      }, {
        accessKey: "a",
        autoClose: false
      });
      
    
      const menu_command_id_2 = GM_registerMenuCommand("Show filtered wives", function(event) {
        let names = get_names();

        if(names.length > 1) { 
            alert(names.toString());
        } else {
            alert("No wives filtered!")
        }
      }, {
        accessKey: "b",
        autoClose: false
      });
      

      const menu_command_id_3 = GM_registerMenuCommand("Remove a wife", function(event) {

        let result = prompt("Enter the vives to remove from the filter separated by: | ");
        let valuesToDel = result.split('|');
        let success = delete_names(valuesToDel);

        alert("Sucessfully removed : \n" + success.toString())
        
      }, {
        accessKey: "b",
        autoClose: false
      });
      
    
    const menu_command_id_4 = GM_registerMenuCommand("Clear whole filter", function(event) {
         
        let names = get_names();
        let success = delete_names(names);

        alert("Successfully removed : \n" + success.toString())
      }, {
        accessKey: "b",
        autoClose: false
      });
      

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
        let blocked = document.createElement("img");
        blocked.setAttribute("src", IMG_CENSOR);
        document.body.appendChild(blocked);

    }

}

const page = document.documentElement.innerHTML;

// add terms/names to censor in this array. Will add a config windows soon if possible
const wives = get_names();
wives.shift() // for some reason I always end up with a garbage [""] as first element, this is the easy way out

if(wives.length > 0) {
    let regex = buildMatch(wives);
    censors(regex);
}

})();
