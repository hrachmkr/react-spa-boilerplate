/* @flow */

import { produce } from 'immer'

import { fetchProjectDataProducer } from './producers'

const initialState = {
  name: '',
  surname: ''
}

const project = (state: any = initialState, action: any): any => {
  return produce(state, (draft: any) => {
    switch (action.type) {
      case 'FETCH_PROJECT_DATA':
        fetchProjectDataProducer(action)(state, draft)
        break
    }
  })
}

export default project
