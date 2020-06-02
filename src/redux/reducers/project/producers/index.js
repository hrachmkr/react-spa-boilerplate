// @flow

/**
 * @export
 * @description - Function for changing icon size coef in redux store.
 */
export const fetchProjectDataProducer = (action: any) => (
  state: any,
  draft: any
) => {
  draft.data = action.value
}
