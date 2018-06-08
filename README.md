# TypeScript Maybe
This is an implementation of the Maybe type in TypeScript.
Maybe is used to encapsulate optional/nullable/undefineable values.

# Installation
This package is not published to npm yet.

# Usage
You can use `Maybe<T>` anywhere you would normally use `T | undefined` or 
`T | null` as a type.

Example using `T | undefined`:
```typescript
function head<T>(list: T[]): T | undefined {
  return list.length === 0 ? undefined : list[0];
}
```
Example rewritten using `Maybe<T>`:
```typescript
function head<T>(list: T[]): Maybe<T> {
  return new Maybe(list[0]);
}
```
# Constructors
* `new Maybe()`: Constructs a new Maybe from any value. This has the advantage that you don't need to know beforehand if the value is Just.
* `Maybe.Just()`: Constructs a new Maybe when the value is known to be Just.
* `Maybe.Nothing()`: Constructs a new Maybe with a value of Nothing.

# Methods
* `isJust()`: Returns true when the Maybe encapsulates a Just value
* `isNothing()`: Returns true when the Maybe encapsulates Nothing.
* `maybe(defaultValue, func)`: Applies `func` to the value encapsulated by the Maybe, if it is Just. Otherwise, returns `defaultValue` encapsulatd in the Maybe.
* `fromJust()`: Returns the value encapsulated in a Maybe, if it is Just. Otherwise, throws an error.
* `fromMaybe(defaultValue)`: Returns the value encapsulated in the Maybe, if it is Just. Otherwise, returns the `defaultvalue`.
* `maybeToList()`: Returns a list containing the value encapsulated in the Maybe, if it is Just. Otherwise, returns and empty list.

# Other
* `listToMaybe(list)`: Returns the first element of `list` encapsulated in a Maybe. If `list` is empty, returns Nothing.
* `catMaybes(list)`: Takes a list of Maybe values and returns a list of all the values that are Just.
* `mapMaybe(func, list)`: Applies `func` to all of the Just values in `list`.