export interface PureObject<T = any> {
    [key: string]: T
}

export type NumberLike = string | number;

export type StringLike = string | RegExp;