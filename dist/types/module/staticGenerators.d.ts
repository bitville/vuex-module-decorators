import { Module, Store } from 'vuex';
export declare function staticStateGenerator<S extends Object, R>(statics: any, module: Module<S, R>, store: Store<any>, path: string[]): void;
export declare function staticGetterGenerator<S, R>(statics: any, module: Module<S, R>, store: Store<R>, namespace?: string | null): void;
export declare function staticMutationGenerator<S, R>(statics: any, module: Module<S, R>, store: Store<R>, namespace?: string | null): void;
export declare function staticActionGenerator<S, R>(statics: any, module: Module<S, R>, store: Store<R>, namespace?: string | null): void;
export declare function staticModuleGenerator<S, R>(module: Module<S, R>, store: Store<R>, path?: string[], namespace?: string | null, recursive?: boolean): S;
