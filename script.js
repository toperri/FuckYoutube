// ==UserScript==
// @name         NoTube
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Skip ads on YouTube videos. Should be updated when new mesaures are taken by YouTube to prevent this script from working.
// @author       toperri
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var __curMeNum = 1; // Constant linked to CurrentMethod (if this is x then CurrentMethod is Mx)
    var CurrentMethod = "M1"; // Current method to use
    var ShouldHavePlayedVideo = 0; // Should have played the video by next iteration (num is retries)

    setInterval(function() {
        if (document.querySelector("div.ad-showing")) {
            if (ShouldHavePlayedVideo >= 3) {
                ShouldHavePlayedVideo = 0;
                __curMeNum++;
                CurrentMethod = "M" + __curMeNum;
            }
            switch (CurrentMethod) {
                case "M1":
                    document.querySelector("video").currentTime = document.querySelector("video").duration;
                    ShouldHavePlayedVideo++;
                    break; // Add break to avoid falling through
                case "M2":
                    // fallback method.
                    document.querySelector("video").playbackRate = 9;
                    break; // Add break to avoid falling through
                default:
                    console.error("No method found for " + CurrentMethod);
                    break; // Add break to avoid falling through
            }
        } else {
            ShouldHavePlayedVideo = 0; // Reset the counter
        }
    }, 100);

})();
