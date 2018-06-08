"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("./Maybe");
function head(list) {
    return new Maybe_1.Maybe(list[0]);
}
