export { VuexModule, VuexStore, newStore, Context } from './vuexmodule';
export { Module } from './module';
export { Submodule } from './submodule';
export { Action } from './action';
export { Mutation } from './mutation';
export { MutationAction } from './mutationaction';
import { install } from './helpers';
declare const _default: {
    install: typeof install;
};
export default _default;
