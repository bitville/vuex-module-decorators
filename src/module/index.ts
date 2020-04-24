import { GetterTree, Module as Mod, Store } from 'vuex'
import { DynamicModuleOptions, ModuleOptions } from '../moduleoptions'
import { stateFactory as sf } from './stateFactory'
import { addPropertiesToObject } from '../helpers'
import {
  staticActionGenerators,
  staticGetterGenerator,
  staticMutationGenerator,
  staticStateGenerator
} from './staticGenerators'

function registerDynamicModule<S>(module: Mod<S, any>, modOpt: DynamicModuleOptions) {
  if (!modOpt.name) {
    throw new Error('Name of module not provided in decorator options')
  }

  if (!modOpt.store) {
    throw new Error('Store not provided in decorator options when using dynamic option')
  }

  modOpt.store.registerModule(
    modOpt.name, // TODO: Handle nested modules too in future
    module,
    { preserveState: modOpt.preserveState || false }
  )
}

function moduleDecoratorFactory<S>(moduleOptions: ModuleOptions) {
  return function<TFunction extends Function>(constructor: TFunction): TFunction | void {
    const module: Function & Mod<S, any> = constructor
    const stateFactory = () => sf(module)

    if (!module.state) {
      module.state = moduleOptions && moduleOptions.stateFactory ? stateFactory : stateFactory()
    }
    if (!module.getters) {
      module.getters = {} as GetterTree<S, any>
    }
    if (!module.namespaced) {
      module.namespaced = moduleOptions && moduleOptions.namespaced
    }
    Object.getOwnPropertyNames(module.prototype).forEach((funcName: string) => {
      const descriptor = Object.getOwnPropertyDescriptor(
        module.prototype,
        funcName
      ) as PropertyDescriptor
      if (descriptor.get && module.getters) {
        module.getters[funcName] = function(
          state: S,
          getters: GetterTree<S, any>,
          rootState: any,
          rootGetters: GetterTree<any, any>
        ) {
          const thisObj = { context: { state, getters, rootState, rootGetters } }
          addPropertiesToObject(thisObj, state)
          addPropertiesToObject(thisObj, getters)
          const got = (descriptor.get as Function).call(thisObj)
          return got
        }
      }
    })
    const modOpt = moduleOptions as DynamicModuleOptions
    if (modOpt.name) {
      Object.defineProperty(constructor, '_vmdModuleName', {
        value: modOpt.name
      })
    }

    if (modOpt.store) {
      Object.defineProperty(constructor, '_store', {
        value: modOpt.store
      })
    }

    if (modOpt.dynamic) {
      registerDynamicModule(module, modOpt)
    }
    return constructor
  }
}

export function Module<S>(module: Function & Mod<S, any>): void
export function Module<S>(options: ModuleOptions): ClassDecorator

export function Module<S>(modOrOpt: ModuleOptions | (Function & Mod<S, any>)) {
  if (typeof (modOrOpt as any) === 'function') {
    /*
     * @Module decorator called without options (directly on the class definition)
     */
    moduleDecoratorFactory({})(modOrOpt as Function & Mod<S, any>)
  } else {
    /*
     * @Module({...}) decorator called with options
     */
    return moduleDecoratorFactory(modOrOpt)
  }
}
