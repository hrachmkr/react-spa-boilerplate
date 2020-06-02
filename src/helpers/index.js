//@flow
declare type QSObj = Object

/**
 * @export
 * @param {object} query
 * @description Function which makes query string from an object.
 * @returns {string}
 */
export const objToQs = (query?: QSObj) => {
  if (!query) {
    return ''
  }

  const q = query

  const qs = Object.keys(q)
    .map((key) => {
      if (q[key] || q[key] === 0) {
        return `${key}=${q[key]}`
      }
    })
    .filter((val) => val)
    .join('&')
  return qs.length > 0 ? `?${qs}` : ''
}
