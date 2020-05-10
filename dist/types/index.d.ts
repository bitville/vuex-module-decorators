export { VuexModule, VuexStore, Context } from './vuexmodule';
export { Module } from './module';
export { Submodule } from './submodule';
export { Action } from './action';
export { Mutation } from './mutation';
export { MutationAction } from './mutationaction';
import { VuexModule, VuexStore } from './vuexmodule';
import { install } from './helpers';
declare const _default: {
    Module: typeof VuexModule;
    Store: typeof VuexStore;
    install: typeof install;
};
export default _default;
