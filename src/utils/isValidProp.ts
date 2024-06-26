export function isValidProp(target: any, prop: symbol | string | number) {
  if (typeof target[prop] === 'function') {
    return
  }

  // eslint-disable-next-line no-prototype-builtins
  if (!target.hasOwnProperty(prop)) {
    throw new Error(`[BAD PROP]:[${prop.toString()}] Invalid Property Access via Proxy State`)
  }
}
