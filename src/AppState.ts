import { action, makeAutoObservable } from 'mobx'
import { isValidProp } from './utils/isValidProp.ts'
import { target } from './interfaces/target.ts'

class ObservableAppState {
  constructor() {
    makeAutoObservable(this)
  }
}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target: target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target: target, prop, value) {
    isValidProp(target, prop)
    action(() => {
      target[prop] = value
    })()
    return true
  }
})
