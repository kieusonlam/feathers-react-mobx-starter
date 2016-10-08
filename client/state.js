import { observable, asFlat, toJS } from 'mobx'
import mergeObservables from '../client/utils/mergeObservables'

// Default state structure
let defaultState =  observable({
    app: {
        title: 'Mobx Isomorphic Starter',
        description : 'Here goes description',
        host: ''
    },
    browse: {
        data : '',
        data2: ''
    },
    messages: {
      text: '',
      items: asFlat([])
    }
})


// Export function that creates our server tate
export const createServerState = () => toJS(defaultState)

// Export function that creates our client state
export const createClientState = () => mergeObservables(defaultState, window.__STATE)
