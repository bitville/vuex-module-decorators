import { Module as Mod } from 'vuex';
export interface SubmoduleDecoratorParams<S, R> {
    module: Mod<S, R>;
    namespaced?: boolean;
    init?: () => S | S;
}
export declare function Submodule<T>(target: T, key: string | symbol): void;
export declare function Submodule<T, S = any, R = any>(params: SubmoduleDecoratorParams<S, R>): PropertyDecorator;
