export type Nothing = null | undefined;
export type Just<T> = T;

export class Maybe<T> {

  public static Nothing<T>(): Maybe<T> {
    return new Maybe(undefined as Nothing);
  }

  public static Just<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  public static listToMaybe<T>(list: T[]): Maybe<T> {
    return list.length === 0 ? Maybe.Nothing() : Maybe.Just(list[0]);
  }

  public static catMaybes<T>(list: Array<Maybe<T>>): T[] {
    return list.filter((m) => m.isJust()).map((m) => m.fromJust());
  }

  public static mapMaybe<T, S>(func: (input: S) => Maybe<T>, list: S[]): T[] {
    return Maybe.catMaybes(list.map((s) => func(s)));
  }

  private value: Just<T> | Nothing;

  constructor(value: Nothing | Just<T>) {
    this.value = value;
  }

  public isJust(): boolean {
    return !this.isNothing();
  }

  public isNothing(): boolean {
    return this.value === undefined || this.value === null;
  }

  public maybe<S>(defaultValue: S, func: (input: T) => S): Maybe<S> {
    return this.isNothing() ? Maybe.Just(defaultValue) : Maybe.Just(func(this.value!));
  }

  public fromJust(): T {
    if (this.isJust()) {
      return this.value!;
    } else {
      throw new Error("Maybe.fromJust: Nothing");
    }
  }

  public fromMaybe(defaultValue: T): T {
    return this.isNothing() ? defaultValue : this.fromJust();
  }

  public maybeToList(): T[] {
    return this.isNothing() ? [] : [this.fromJust()];
  }

}
