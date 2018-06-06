import {createStore} from 'redux'
import initialize from './ActionCreators'
import initialReducer from './Reducer'

const store = createStore(initialReducer)
export default store
