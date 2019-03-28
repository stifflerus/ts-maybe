"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        this.value = value;
    }
    Maybe.Nothing = function () {
        return new Maybe(undefined);
    };
    Maybe.Just = function (value) {
        return new Maybe(value);
    };
    Maybe.listToMaybe = function (list) {
        return list.length === 0 ? Maybe.Nothing() : Maybe.Just(list[0]);
    };
    Maybe.catMaybes = function (list) {
        return list.filter(function (m) { return m.isJust(); }).map(function (m) { return m.fromJust(); });
    };
    Maybe.mapMaybe = function (func, list) {
        return Maybe.catMaybes(list.map(function (s) { return func(s); }));
    };
    Maybe.prototype.isJust = function () {
        return !this.isNothing();
    };
    Maybe.prototype.isNothing = function () {
        return this.value === undefined || this.value === null;
    };
    Maybe.prototype.maybe = function (defaultValue, func) {
        return this.isNothing() ? Maybe.Just(defaultValue) : Maybe.Just(func(this.value));
    };
    Maybe.prototype.fromJust = function () {
        if (this.isJust()) {
            return this.value;
        }
        else {
            throw new Error("Maybe.fromJust: Nothing");
        }
    };
    Maybe.prototype.fromMaybe = function (defaultValue) {
        return this.isNothing() ? defaultValue : this.fromJust();
    };
    Maybe.prototype.maybeToList = function () {
        return this.isNothing() ? [] : [this.fromJust()];
    };
    Maybe.prototype.bind = function (func) {
        return this.isJust() ? func(this.fromJust()) : Maybe.Nothing();
    };
    return Maybe;
}());
exports.Maybe = Maybe;
