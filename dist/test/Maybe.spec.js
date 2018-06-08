"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsverify = require("jsverify");
var _ = require("lodash");
var maybe_1 = require("../src/maybe");
var arbJustValue = jsverify.suchthat(jsverify.json, function (json) { return json !== undefined && json !== null; });
var arbNothing = jsverify.either(jsverify.constant(undefined), jsverify.constant(null));
describe("Maybe.Just", function () {
    jsverify.property("fromJust returns same value", arbJustValue, function (justValue) {
        return _.isEqual(maybe_1.Maybe.Just(justValue).fromJust(), justValue);
    });
    jsverify.property("isJust returns true", arbJustValue, function (justValue) {
        return maybe_1.Maybe.Just(justValue).isJust() === true;
    });
    jsverify.property("isNothing returns false", arbJustValue, function (justValue) {
        return maybe_1.Maybe.Just(justValue).isNothing() === false;
    });
    jsverify.property("maybe returns result of function applied to value", arbJustValue, arbJustValue, jsverify.fun(arbJustValue), function (justValue, defaultValue, func) {
        return _.isEqual(maybe_1.Maybe.Just(justValue).maybe(defaultValue, func), maybe_1.Maybe.Just(func(justValue)));
    });
    jsverify.property("fromMaybe returns value", arbJustValue, arbJustValue, function (justValue, defaultValue) {
        return _.isEqual(maybe_1.Maybe.Just(justValue).fromMaybe(defaultValue), justValue);
    });
    jsverify.property("maybeToList returns list with one element", arbJustValue, function (justValue) {
        return _.isEqual(maybe_1.Maybe.Just(justValue).maybeToList(), [justValue]);
    });
});
describe("Maybe.Nothing", function () {
    jsverify.property("isJust returns false", function () {
        return maybe_1.Maybe.Nothing().isJust() === false;
    });
    jsverify.property("isNothing returns true", function () {
        return maybe_1.Maybe.Nothing().isNothing() === true;
    });
    jsverify.property("fromJust throws error", function () {
        try {
            maybe_1.Maybe.Nothing().fromJust();
            return false;
        }
        catch (error) {
            return _.isError(error) && error.message === "Maybe.fromJust: Nothing";
        }
    });
    jsverify.property("maybe returns default value", arbJustValue, jsverify.fun(arbJustValue), function (defaultValue, func) {
        return _.isEqual(maybe_1.Maybe.Nothing().maybe(defaultValue, func), maybe_1.Maybe.Just(defaultValue));
    });
    jsverify.property("fromMaybe returns default value", arbJustValue, function (defaultValue) {
        return _.isEqual(maybe_1.Maybe.Nothing().fromMaybe(defaultValue), defaultValue);
    });
    jsverify.property("maybeToList returns empty list", function () {
        return _.isEqual(maybe_1.Maybe.Nothing().maybeToList(), []);
    });
});
describe("Maybe.listToMaybe", function () {
    var nonEmptyList = jsverify.suchthat(jsverify.array(arbJustValue), function (list) { return list.length > 0; });
    jsverify.property("empty array returns Nothing", jsverify.constant([]), function (empty) {
        return maybe_1.Maybe.listToMaybe(empty).isNothing();
    });
    jsverify.property("non-empty array returns Just first element of list", nonEmptyList, function (list) {
        var result = maybe_1.Maybe.listToMaybe(list);
        return result.isJust() && result.fromJust() === list[0];
    });
});
