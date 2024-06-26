import { dev } from '../env'

function log(type: 'log' | 'error' | 'warn' | 'trace', content: Array<string | Error>) {
  if (dev) {
    // eslint-disable-next-line no-console
    console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content)
  } else {
    switch (type) {
      // case 'assert':
      case 'log':
        return
    }
    // TODO SEND LOGS TO EXTERNAL SERVICE
    // eslint-disable-next-line no-console
    console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content)
  }
}

export const logger = {
  log(...args: Array<any>) {
    log('log', args)
  },
  error(...args: Array<string | Error>) {
    log('error', args)
  },
  warn(...args: Array<string | Error>) {
    log('warn', args)
  },
  // assert() {
  //   log(arguments, 'assert')
  // },
  trace(...args: Array<string | Error>) {
    log('trace', args)
  }
}
