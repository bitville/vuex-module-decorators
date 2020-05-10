'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vuex = require('vuex');
var Vuex__default = _interopDefault(Vuex);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * Takes the properties on object from parameter source and adds them to the object
 * parameter target
 * @param {object} target  Object to have properties copied onto from y
 * @param {object} source  Object with properties to be copied to x
 */
function addPropertiesToObject(target, source) {
    var _loop_1 = function (k) {
        Object.defineProperty(target, k, {
            get: function () { return source[k]; }
        });
    };
    for (var _i = 0, _a = Object.keys(source || {}); _i < _a.length; _i++) {
        var k = _a[_i];
        _loop_1(k);
    }
}
function getStaticName(path) {
    if (path.length === 0) {
        return '$statics';
    }
    return '$statics.' + path.join('.');
}
/**
 * Returns a namespaced name of the module to be used as a store getter
 * @param module
 */
function getModuleNamespace(modOpt) {
    if (!modOpt.name) {
        throw new Error("ERR_GET_MODULE_NAME : Could not get module accessor.\n      Make sure your module has name, we can't make accessors for unnamed modules\n      i.e. @Module({ name: 'something' })");
    }
    if (modOpt.namespaced) {
        return "" + modOpt.name;
    }
    return '';
}
/**
 * Returns a namespaced path of the module to be used as a store getter
 * @param module
 */
function getModulePath(modOpt) {
    if (!modOpt.name) {
        throw new Error("ERR_GET_MODULE_NAME : Could not get module accessor.\n      Make sure your module has name, we can't make accessors for unnamed modules\n      i.e. @Module({ name: 'something' })");
    }
    return modOpt.name.split('/');
}
function getNamespacedKey(namespace, key) {
    return namespace ? namespace + "/" + key : key;
}
function install(Vue) {
    Vue.use(Vuex__default);
    Vue.mixin({ beforeCreate: storeInit });
    function storeInit() {
        var _this = this;
        Object.defineProperty(this, '$stock', {
            get: function () { return _this.$store.getters.$statics; }
        });
    }
}

function staticStateGenerator(statics, module, store, path) {
    var stateFactory = module.state;
    if (stateFactory === undefined) {
        return;
    }
    var state = typeof stateFactory === 'function' ? stateFactory() : stateFactory;
    var modules = module.modules || {};
    var contextedState;
    Object.keys(state).forEach(function (key) {
        if (state.hasOwnProperty(key) && !modules.hasOwnProperty(key)) {
            // If not undefined or function means it is a state value
            if (['undefined', 'function'].indexOf(typeof state[key]) === -1) {
                Object.defineProperty(statics, key, {
                    get: function () {
                        if (contextedState === undefined) {
                            contextedState = path.reduce(function (state, key) { return state[key]; }, store.state);
                        }
                        return contextedState[key];
                    },
                    enumerable: true
                });
            }
        }
    });
}
function staticGetterGenerator(statics, module, store, namespace) {
    var getters = module.getters || {};
    Object.keys(getters).forEach(function (key) {
        var namespacedKey = getNamespacedKey(namespace, key);
        Object.defineProperty(statics, key, {
            get: function () {
                return store.getters[namespacedKey];
            },
            enumerable: true
        });
    });
}
function staticMutationGenerator(statics, module, store, namespace) {
    var mutations = module.mutations || {};
    Object.keys(mutations).forEach(function (key) {
        var namespacedKey = getNamespacedKey(namespace, key);
        statics[key] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return store.commit.apply(store, __spreadArrays([namespacedKey], args));
        };
    });
}
function staticActionGenerator(statics, module, store, namespace) {
    var actions = module.actions || {};
    Object.keys(actions).forEach(function (key) {
        var namespacedKey = actions[key].root ? key : getNamespacedKey(namespace, key);
        statics[key] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return store.dispatch.apply(store, __spreadArrays([namespacedKey], args));
        };
    });
}
function staticModuleGenerator(module, store, path, namespace, recursive) {
    if (path === void 0) { path = []; }
    if (recursive === void 0) { recursive = true; }
    var statics = Object.create(module.prototype || null);
    staticStateGenerator(statics, module, store, path);
    staticGetterGenerator(statics, module, store, namespace);
    staticMutationGenerator(statics, module, store, namespace);
    staticActionGenerator(statics, module, store, namespace);
    if (recursive) {
        var modules_1 = module.modules || {};
        Object.keys(modules_1).forEach(function (key) {
            var subModule = modules_1[key];
            // TODO: if not namespaced should statics be flatten?
            var subNamespace = subModule.namespaced ? getNamespacedKey(namespace, key) : namespace;
            var subPath = path.concat(key);
            var subStaics = staticModuleGenerator(subModule, store, subPath, subNamespace, recursive);
            statics[key] = subStaics;
        });
    }
    return statics;
}

var Context = /** @class */ (function () {
    function Context(context, path, namespace) {
        if (path === void 0) { path = []; }
        var _a, _b;
        this.context = context;
        this.path = path;
        this.namespace = namespace;
        this.state = path.reduce(function (state, key) { return state[key]; }, context.state);
        this.getters = this.context.getters;
        context = context;
        this.rootGetters = (_a = context.rootGetters) !== null && _a !== void 0 ? _a : context.getters;
        this.rootState = (_b = context.rootState) !== null && _b !== void 0 ? _b : context.state;
    }
    Context.prototype.namespaced = function (key) {
        if (!this.namespace) {
            return key;
        }
        if (typeof key === 'string') {
            return this.namespace + "/" + key;
        }
        else {
            key.type = this.namespace + "/" + key.type;
            return key;
        }
    };
    Context.prototype.getter = function (key) {
        return this.getters[this.namespaced(key)];
    };
    Context.prototype.dispatch = function (key) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.context).dispatch.apply(_a, __spreadArrays([this.namespaced(key)], args));
    };
    Context.prototype.commit = function (key) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.context).commit.apply(_a, __spreadArrays([this.namespaced(key)], args));
    };
    return Context;
}());
var VuexModule = /** @class */ (function () {
    function VuexModule() {
    }
    VuexModule.create = function (module) {
        var result = Object.assign({}, module);
        return result;
    };
    return VuexModule;
}());
function installStatics(root, module, statics, path, namespace, recursive) {
    if (path === void 0) { path = []; }
    if (recursive === void 0) { recursive = true; }
    root[getStaticName(path)] = statics;
    var moduleMap = {
        namespaced: module.namespaced,
        modules: {}
    };
    var prefix = namespace ? namespace + "/$statics/" : '$statics/';
    var keys = moduleMap.keys || [];
    var actionKeys = Object.keys(module.actions || {});
    var gettersKey = Object.keys(module.getters || {});
    moduleMap.keys = keys.concat(actionKeys, gettersKey);
    moduleMap.keys.forEach(function (key) { return (root[prefix + key] = statics); });
    var modules = module.modules || {};
    if (recursive) {
        Object.keys(modules).forEach(function (key) {
            var subModule = modules[key];
            var subNamespace = subModule.namespaced ? getNamespacedKey(namespace, key) : namespace;
            moduleMap.modules[key] = installStatics(root, subModule, statics[key], path.concat(key), subNamespace, recursive);
        });
    }
    return moduleMap;
}
function newStore(module) {
    var store = new Vuex.Store(module);
    var statics = staticModuleGenerator(module, store);
    store._vmdModuleMap = installStatics(store.getters, module, statics);
    return store;
}

var reservedKeys = [
    'namespaced',
    'state',
    'getters',
    'mutations',
    'actions',
    'modules',
    'commit',
    'dispatch',
    'factory',
    'context',
    'namespace',
    'path'
];
function stateFactory(module) {
    var state = new module.prototype.constructor();
    var modules = module.modules || {};
    var s = {};
    Object.keys(state).forEach(function (key) {
        if (reservedKeys.indexOf(key) !== -1) {
            if (typeof state[key] !== 'undefined') {
                throw new Error("ERR_RESERVED_STATE_KEY_USED: You cannot use the following\n        [" + reservedKeys.join(', ') + "]\n        as fields in your module. These are reserved as they have special purpose in Vuex");
            }
            return;
        }
        if (state.hasOwnProperty(key) && !modules.hasOwnProperty(key)) {
            if (typeof state[key] !== 'function') {
                s[key] = state[key];
            }
        }
    });
    return s;
}

function registerDynamicModule(module, modOpt) {
    if (!modOpt.name) {
        throw new Error('Name of module not provided in decorator options');
    }
    if (!modOpt.store) {
        throw new Error('Store not provided in decorator options when using dynamic option');
    }
    var oldStatics = modOpt.store.getters.$statics;
    var moduleMap = modOpt.store._vmdModuleMap;
    modOpt.store.registerModule(modOpt.name, // TODO: Handle nested modules too in future
    module, { preserveState: modOpt.preserveState || false });
    if (moduleMap && oldStatics) {
        installStatics(modOpt.store.getters, moduleMap, oldStatics);
        var path = getModulePath(modOpt);
        var name_1 = path[path.length - 1];
        var namespace = getModuleNamespace(modOpt);
        var recursive = true;
        var statics = staticModuleGenerator(module, modOpt.store, path, namespace, recursive);
        var parentStatics = path.slice(0, -1).reduce(function (s, key) { return s[key]; }, oldStatics);
        parentStatics[name_1] = statics;
        var parentModuleMap = path.slice(0, -1).reduce(function (s, key) { return s[key]; }, moduleMap);
        parentModuleMap[name_1] = installStatics(modOpt.store.getters, module, statics, path, namespace, recursive);
    }
}
function moduleDecoratorFactory(moduleOptions) {
    return function (constructor) {
        var module = constructor;
        var stateFactory$1 = function () { return stateFactory(module); };
        Object.defineProperty(constructor, 'factory', {
            get: function () {
                return stateFactory$1;
            }
        });
        if (!module.state) {
            module.state = moduleOptions && moduleOptions.stateFactory ? stateFactory$1 : stateFactory$1();
        }
        if (!module.getters) {
            module.getters = {};
        }
        if (!module.namespaced) {
            module.namespaced = moduleOptions && moduleOptions.namespaced;
        }
        Object.getOwnPropertyNames(module.prototype).forEach(function (funcName) {
            var descriptor = Object.getOwnPropertyDescriptor(module.prototype, funcName);
            if (descriptor.get && module.getters) {
                var staticKey_1 = '$statics/' + funcName;
                module.getters[funcName] = function (state, getters, rootState, rootGetters) {
                    var context = { state: state, getters: getters, rootState: rootState, rootGetters: rootGetters };
                    var moduleAccessor;
                    if (getters[staticKey_1]) {
                        moduleAccessor = getters[staticKey_1];
                        moduleAccessor.context = context;
                    }
                    else {
                        moduleAccessor = { context: context };
                        addPropertiesToObject(moduleAccessor, state);
                        addPropertiesToObject(moduleAccessor, getters);
                    }
                    var got = descriptor.get.call(moduleAccessor);
                    return got;
                };
            }
        });
        var modOpt = moduleOptions;
        if (modOpt.dynamic) {
            registerDynamicModule(module, modOpt);
        }
        return constructor;
    };
}
function Module(modOrOpt) {
    if (typeof modOrOpt === 'function') {
        /*
         * @Module decorator called without options (directly on the class definition)
         */
        moduleDecoratorFactory({})(modOrOpt);
    }
    else {
        /*
         * @Module({...}) decorator called with options
         */
        return moduleDecoratorFactory(modOrOpt);
    }
}

function submoduleDecoratorFactory(params) {
    return function (target, key) {
        var module = target.constructor;
        if (!module.hasOwnProperty('modules')) {
            module.modules = Object.assign({}, module.modules);
        }
        var subModule = VuexModule.create(params.module);
        if (params.namespaced === undefined && subModule.namespaced === undefined) {
            /// unlike module, submodule's namespace is default to true
            subModule.namespaced = true;
        }
        else if (params.namespaced !== undefined) {
            subModule.namespaced = params.namespaced;
        }
        if (params.init !== undefined) {
            subModule.state = params.init;
        }
        module.modules[key] = subModule;
    };
}
/**
 * The @SubModule decorator turns this into an submodule
 *
 * @param paramsOrTarget the params or the target class
 * @param key the name of the submodule
 * @constructor
 */
function Submodule(paramsOrTarget, key) {
    if (!key) {
        /*
         * This is the case when `paramsOrTarget` is params.
         * i.e. when used as -
         * <pre>
            @Submodule({module: MySubModule})
            subName!: MySubModule
         * </pre>
         */
        return submoduleDecoratorFactory(paramsOrTarget);
    }
    else {
        /*
         * This is the case when `paramsOrTarget` is target. not support by now
         * i.e. when used as -
         * <pre>
            @Submodule
            subName!: MySubModule
         * </pre>
         */
        // submoduleDecoratorFactory({} as SubmoduleDecoratorParams<S, R>)(paramsOrTarget as K, key)
        throw new Error("ERR_SUBMODULE_NO_MODULE : Could not create module.\n      Make sure your submodule has type, we generate StoreOption for untyped submodules\n      i.e. @Submodule({ module: MyModule })");
    }
}

function actionDecoratorFactory(params) {
    var _a = params || {}, _b = _a.commit, commit = _b === void 0 ? undefined : _b, _c = _a.rawError, rawError = _c === void 0 ? false : _c, _d = _a.root, root = _d === void 0 ? false : _d;
    return function (target, key, descriptor) {
        var module = target.constructor;
        if (!module.hasOwnProperty('actions')) {
            module.actions = Object.assign({}, module.actions);
        }
        var actionFunction = descriptor.value;
        var staticKey = '$statics/' + String(key);
        var action = function (context, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var actionPayload, moduleAccessor, thisObj, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            actionPayload = void 0;
                            if (!context.getters[staticKey]) return [3 /*break*/, 2];
                            moduleAccessor = context.getters[staticKey];
                            moduleAccessor.context = context;
                            return [4 /*yield*/, actionFunction.call(moduleAccessor, payload)];
                        case 1:
                            actionPayload = _a.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            thisObj = { context: context };
                            addPropertiesToObject(thisObj, context.state);
                            addPropertiesToObject(thisObj, context.getters);
                            return [4 /*yield*/, actionFunction.call(thisObj, payload)];
                        case 3:
                            actionPayload = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (commit) {
                                context.commit(commit, actionPayload);
                            }
                            return [2 /*return*/, actionPayload];
                        case 5:
                            e_1 = _a.sent();
                            throw rawError
                                ? e_1
                                : new Error('ERR_ACTION_ACCESS_UNDEFINED: Are you trying to access ' +
                                    'this.someMutation() or this.someGetter inside an @Action? \n' +
                                    'That works only in dynamic modules. \n' +
                                    'If not dynamic use this.context.commit("mutationName", payload) ' +
                                    'and this.context.getters["getterName"]' +
                                    '\n' +
                                    new Error("Could not perform action " + key.toString()).stack +
                                    '\n' +
                                    e_1.stack);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        module.actions[key] = root ? { root: root, handler: action } : action;
    };
}
/**
 * The @Action decorator turns an async function into an Vuex action
 *
 * @param targetOrParams the module class
 * @param key name of the action
 * @param descriptor the action function descriptor
 * @constructor
 */
function Action(targetOrParams, key, descriptor) {
    if (!key && !descriptor) {
        /*
         * This is the case when `targetOrParams` is params.
         * i.e. when used as -
         * <pre>
            @Action({commit: 'incrCount'})
            async getCountDelta() {
              return 5
            }
         * </pre>
         */
        return actionDecoratorFactory(targetOrParams);
    }
    else {
        /*
         * This is the case when @Action is called on action function
         * without any params
         * <pre>
         *   @Action
         *   async doSomething() {
         *    ...
         *   }
         * </pre>
         */
        actionDecoratorFactory()(targetOrParams, key, descriptor);
    }
}

function Mutation(target, key, descriptor) {
    var module = target.constructor;
    if (!module.hasOwnProperty('mutations')) {
        module.mutations = Object.assign({}, module.mutations);
    }
    var mutationFunction = descriptor.value;
    var mutation = function (state, payload) {
        mutationFunction.call(state, payload);
    };
    module.mutations[key] = mutation;
}

function mutationActionDecoratorFactory(params) {
    return function (target, key, descriptor) {
        var module = target.constructor;
        if (!module.hasOwnProperty('mutations')) {
            module.mutations = Object.assign({}, module.mutations);
        }
        if (!module.hasOwnProperty('actions')) {
            module.actions = Object.assign({}, module.actions);
        }
        var mutactFunction = descriptor.value;
        var action = function (context, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var actionPayload, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, mutactFunction.call(context, payload)];
                        case 1:
                            actionPayload = _a.sent();
                            context.commit(key, actionPayload);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            if (params.rawError) {
                                throw e_1;
                            }
                            else {
                                console.error('Could not perform action ' + key.toString());
                                console.error(e_1);
                                return [2 /*return*/, Promise.reject(e_1)];
                            }
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        var mutation = function (state, payload) {
            if (!params.mutate) {
                params.mutate = Object.keys(payload);
            }
            for (var _i = 0, _a = params.mutate; _i < _a.length; _i++) {
                var stateItem = _a[_i];
                if (state.hasOwnProperty(stateItem) && payload.hasOwnProperty(stateItem)) {
                    state[stateItem] = payload[stateItem];
                }
                else {
                    throw new Error("ERR_MUTATE_PARAMS_NOT_IN_PAYLOAD\n          In @MutationAction, mutate: ['a', 'b', ...] array keys must\n          match with return type = {a: {}, b: {}, ...} and must\n          also be in state.");
                }
            }
        };
        module.actions[key] = params.root ? { root: true, handler: action } : action;
        module.mutations[key] = mutation;
    };
}
/**
 * The @MutationAction decorator turns this into an action that further calls a mutation
 * Both the action and the mutation are generated for you
 *
 * @param paramsOrTarget the params or the target class
 * @param key the name of the function
 * @param descriptor the function body
 * @constructor
 */
function MutationAction(paramsOrTarget, key, descriptor) {
    if (!key && !descriptor) {
        /*
         * This is the case when `paramsOrTarget` is params.
         * i.e. when used as -
         * <pre>
            @MutationAction({mutate: ['incrCount']})
            async getCountDelta() {
              return {incrCount: 5}
            }
         * </pre>
         */
        return mutationActionDecoratorFactory(paramsOrTarget);
    }
    else {
        /*
         * This is the case when `paramsOrTarget` is target.
         * i.e. when used as -
         * <pre>
            @MutationAction
            async getCountDelta() {
              return {incrCount: 5}
            }
         * </pre>
         */
        mutationActionDecoratorFactory({})(paramsOrTarget, key, descriptor);
    }
}

var index = {
    install: install
};

exports.Action = Action;
exports.Context = Context;
exports.Module = Module;
exports.Mutation = Mutation;
exports.MutationAction = MutationAction;
exports.Submodule = Submodule;
exports.VuexModule = VuexModule;
exports.default = index;
exports.newStore = newStore;
//# sourceMappingURL=index.js.map
