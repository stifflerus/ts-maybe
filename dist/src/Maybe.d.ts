export declare type Nothing = null | undefined;
export declare type Just<T> = T;
export declare class Maybe<T> {
    static Nothing<T>(): Maybe<T>;
    static Just<T>(value: T): Maybe<T>;
    static listToMaybe<T>(list: T[]): Maybe<T>;
    static catMaybes<T>(list: Array<Maybe<T>>): T[];
    static mapMaybe<T, S>(func: (input: S) => Maybe<T>, list: S[]): T[];
    private value;
    private constructor();
    isJust(): boolean;
    isNothing(): boolean;
    maybe<S>(defaultValue: S, func: (input: T) => S): Maybe<S>;
    fromJust(): T;
    fromMaybe(defaultValue: T): T;
    maybeToList(): T[];
}
