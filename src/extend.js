import { warn } from './util'
import format from './format'
import { getValue } from './path'


/**
 * extend
 * 
 * @param {Vue} Vue
 * @return {Vue}
 */

export default function (Vue) {
  function translate (locale, key, args) {
    if (!locale) { return null }

    const val = getValue(locale, key) || locale[key]
    if (!val) { return null }

    return args ? format(val, args) : val
  }

  function warnDefault (key, defaultValue) {
    if (process.env.NODE_ENV !== 'production' && defaultValue === null) {
      warn('Cannot translate the value of keypath "' + key + '". '
        + 'Use the value of keypath as default')
    }

    if (defaultValue !== null) {
      key = defaultValue
    }

    return key
  }


  /**
   * Vue.t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.t = (key, options) => {
    if (!key) { return '' }

    const transOptions = options || {}
    const params = transOptions.params || undefined
    const lang = transOptions.lang || Vue.config.lang
    const defaultValue = transOptions.defaultValue || null

    return translate(Vue.locale(lang), key, params) || warnDefault(key, defaultValue)
  }


  /**
   * $t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.prototype.$t = function (key, options) {
    if (!key) { return '' }

    const transOptions = options || {}
    const params = transOptions.params || undefined
    const lang = transOptions.lang || Vue.config.lang
    const defaultValue = transOptions.defaultValue || null

    return translate(this.$options.locales && this.$options.locales[lang], key, params)
      || translate(Vue.locale(lang), key, params)
      || warnDefault(key, defaultValue)
  }

  return Vue
}

