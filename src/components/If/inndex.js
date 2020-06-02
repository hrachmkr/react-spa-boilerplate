/* @flow */
type Iif = {
  condition: boolean,
  then: React$Element<any> | string | (() => any),
  otherwise?: React$Element<any> | string | (() => any),
}

/**
 * If condition mets return then or otherwise
 * @param {Iif} params - Condition, then, otherwise
 */
export const If = ({ condition, then, otherwise }: Iif) => {
  if (condition) {
    if (typeof then === 'function') {
      return then()
    } else {
      return then || null
    }
  } else {
    if (typeof otherwise === 'function') {
      return otherwise()
    } else {
      return otherwise || null
    }
  }
}
