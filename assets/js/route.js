/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

'use strict';

import {updateWeather, error404} from "./app.js";
const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474" // London

const currentLocation = function() {
    window.navigator.geolocation.getCurrentPosition(res => {
        const {latitude, lonitude} = res.coords;
        updateWeather(`lat=${latitude}`, `lon=${lonitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    });
}

/**
 * @param {string} query searched query
 */
const searchedLocation = query => updateWeather(...query.split("&"));
// updateWeather("lat=51.5073219", "lon=-0.1276474")

const routers = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = function() {
    const requestURL = window.location.hash.slice(1);
    const [router, query] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routers.get(router) ? routers.get(router)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function() {
    if(!this.window.location.hash) {
        this.window.location.hash = "#/current-location";
    }
    else {
        checkHash();
    }
})