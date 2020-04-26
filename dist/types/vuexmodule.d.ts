import { ActionTree, GetterTree, Module as Mod, ModuleTree, MutationTree, Store, ActionContext, Payload } from 'vuex';
export declare class Context<S, R = any> implements ActionContext<S, R> {
    namespace?: string;
    path: string[];
    context: Store<S> | ActionContext<S, R>;
    state: S;
    rootState: R;
    getters: any;
    rootGetters: any;
    namespaced<P extends Payload>(key: string | P): string | P;
    getter(key: string): any;
    dispatch<P extends Payload>(key: string | P, ...args: any[]): Promise<any>;
    commit<P extends Payload>(key: string | P, ...args: any[]): void;
    constructor(context: Store<S> | ActionContext<S, R>, path?: string[], namespace?: string);
}
export declare class VuexModule<S = ThisType<any>, R = any> {
    static namespaced?: boolean;
    static state?: any | (() => any);
    static getters?: GetterTree<any, any>;
    static actions?: ActionTree<any, any>;
    static mutations?: MutationTree<any>;
    static modules?: ModuleTree<any>;
    static factory?: () => any;
    context: ActionContext<S, R>;
    static create<S>(module: Mod<S, any>): typeof VuexModule;
}
declare type ConstructorOf<C> = {
    new (...args: any[]): C;
};
interface ModuleMap extends Mod<any, any> {
    modules?: {
        [key: string]: ModuleMap;
    };
    keys?: string[];
}
export declare function installStatics(root: any, module: ModuleMap, statics: any, path?: string[], namespace?: string, recursive?: boolean): ModuleMap;
export interface VuexStore<S> extends Store<S> {
    getters: {
        $statics: S;
    };
}
export declare function newStore<M extends VuexModule>(module: ConstructorOf<M>): VuexStore<M>;
export declare function newStore<S>(module: Mod<S, S>): VuexStore<S>;
export declare function getModule<M extends VuexModule, R>(moduleClass: ConstructorOf<M>, store?: Store<R>): M;
export {};
