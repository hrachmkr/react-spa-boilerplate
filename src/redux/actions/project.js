//@flow

/**
 * @export
 * @param {string} value
 * @description .
 */
export function fetchProjectData(value: any) {
  return {
    type: 'FETCH_PROJECT_DATA',
    value
  }
}
