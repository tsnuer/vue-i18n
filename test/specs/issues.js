import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'


describe('issues', () => {
  let vm
  beforeEach(() => {
    vm = new Vue()
  })


  describe('#24', () => {
    it('should be translated', () => {
      assert(vm.$t('continue-with-new-account') === locales[Vue.config.lang]['continue-with-new-account'])
    })
  })

  describe('#35', () => {
    it('should be translated', () => {
      assert(vm.$t('underscore', { params: { hello_msg: 'hello' } }) === 'hello world')
    })
  })
})
