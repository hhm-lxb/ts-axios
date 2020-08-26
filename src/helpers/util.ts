const _toString = Object.prototype.toString

// export function isDate (val: any): boolean {
//   return _toString.call(val) === '[object Date]'
// }

// export function isObject (val: any): boolean {
//   return val !== null && typeof val === 'object'
// }

export function isDate(val: any): val is Date {
  // 类型谓词 一种保护机制
  return _toString.call(val) === '[object Date]'
}

// export function isObject (val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return _toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
