import * as jsverify from "jsverify";
import * as _ from "lodash";
import { Maybe, Nothing } from "../src/Maybe";

const arbJustValue = jsverify.suchthat(jsverify.json, (json: any) => json !== undefined && json !== null);
const arbNothing = jsverify.either(jsverify.constant(undefined), jsverify.constant(null));

describe("Maybe.Just", () => {
  jsverify.property("fromJust returns same value", arbJustValue, (justValue: any) => {
    return _.isEqual(Maybe.Just(justValue).fromJust(), justValue);
  });

  jsverify.property("isJust returns true", arbJustValue, (justValue: any) => {
    return Maybe.Just(justValue).isJust() === true;
  });

  jsverify.property("isNothing returns false", arbJustValue, (justValue: any) => {
    return Maybe.Just(justValue).isNothing() === false;
  });

  jsverify.property("maybe returns result of function applied to value",
    arbJustValue, arbJustValue, jsverify.fun(arbJustValue),
    (justValue: any, defaultValue: any, func: (input: any) => any) => {
      return _.isEqual(Maybe.Just(justValue).maybe(defaultValue, func), Maybe.Just(func(justValue)));
    });

  jsverify.property("fromMaybe returns value", arbJustValue, arbJustValue, (justValue: any, defaultValue: any) => {
    return _.isEqual(Maybe.Just(justValue).fromMaybe(defaultValue), justValue);
  });

  jsverify.property("maybeToList returns list with one element", arbJustValue, (justValue: any) => {
    return _.isEqual(Maybe.Just(justValue).maybeToList(), [justValue]);
  });
});

describe("Maybe.Nothing", () => {
  jsverify.property("isJust returns false", () => {
    return Maybe.Nothing().isJust() === false;
  });

  jsverify.property("isNothing returns true", () => {
    return Maybe.Nothing().isNothing() === true;
  });

  jsverify.property("fromJust throws error", () => {
    try {
      Maybe.Nothing().fromJust();
      return false;
    } catch (error) {
      return _.isError(error) && (error as Error).message === "Maybe.fromJust: Nothing";
    }
  });

  jsverify.property("maybe returns default value",
    arbJustValue, jsverify.fun(arbJustValue), (defaultValue: any, func: (input: any) => any) => {
      return _.isEqual(Maybe.Nothing().maybe(defaultValue, func), Maybe.Just(defaultValue));
    });

  jsverify.property("fromMaybe returns default value", arbJustValue, (defaultValue: any) => {
    return _.isEqual(Maybe.Nothing().fromMaybe(defaultValue), defaultValue);
  });

  jsverify.property("maybeToList returns empty list", () => {
    return _.isEqual(Maybe.Nothing().maybeToList(), []);
  });
});

describe("Maybe.listToMaybe", () => {

  const nonEmptyList = jsverify.suchthat(jsverify.array(arbJustValue), (list) => list.length > 0);

  jsverify.property("empty array returns Nothing", jsverify.constant([]), (empty: any[]) => {
    return Maybe.listToMaybe(empty).isNothing();
  });

  jsverify.property("non-empty array returns Just first element of list", nonEmptyList, (list: any[]) => {
    const result = Maybe.listToMaybe(list);
    return result.isJust() && result.fromJust() === list[0];
  });
});
