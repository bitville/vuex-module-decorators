import Vuex, { Module as Mod } from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import { Action, Module, Mutation, MutationAction, VuexModule, Submodule, newStore } from '..'
import { expect } from 'chai'

@Module({ namespaced: true, stateFactory: true })
class Count extends VuexModule {
  data = 2

  @Mutation
  add(n: number) {
    this.data += n
  }

  get len() {
    return this.data
  }
}

@Module({ namespaced: true })
class MySubmodule extends VuexModule {
  @Submodule({ module: Count })
  wheels!: Count

  @Mutation
  setWheels(extra: number) {
    this.wheels.data = extra
  }

  @Action
  incrWheels(extra: number) {
    this.wheels.add(extra)
  }

  get axles() {
    return this.wheels.len / 2
  }
}

@Module
class MyModule extends VuexModule {
  @Submodule({ module: MySubmodule, namespaced: false })
  sub2!: MySubmodule

  @Submodule({ module: MySubmodule, init: MySubmodule.factory })
  sub1!: MySubmodule
}
const store = newStore(MyModule)

describe('submodule works', () => {
  it('should increase axles', function() {
    const module = store.getters.$statics as MyModule
    expect(module.sub1.wheels.data).to.equal(2)
    expect(module.sub2.axles).to.equal(1)
    module.sub1.incrWheels(20)
    module.sub2.incrWheels(40)
    expect(module.sub1.axles).to.equal(11)
    expect(module.sub2.axles).to.equal(21)
    module.sub1.setWheels(40)
    module.sub2.setWheels(20)
    expect(module.sub1.axles).to.equal(20)
    expect(module.sub2.axles).to.equal(10)
  })
})
