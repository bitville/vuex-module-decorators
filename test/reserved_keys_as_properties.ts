import Vuex, { Module } from '..'
import { expect } from 'chai'

describe('prevent using reserved keys', () => {
  it('as module properties', function() {
    expect(() => {
      @Module({ stateFactory: false })
      class MyModule extends Vuex.Module {
        factory = undefined
        context: any = null
      }
    }).to.throw(/ERR_RESERVED_STATE_KEY_USED: .*/)
  })
})
