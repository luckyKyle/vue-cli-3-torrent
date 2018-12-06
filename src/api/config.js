export const MAX_TIME_OUT = 5000

export const ERR_OK = 10000

export const DEV = process.env.NODE_ENV !== 'production'

export const HOST = DEV ? '' : 'http://localhost:3000/'
