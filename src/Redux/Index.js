import {createStore} from 'redux'
import initialize from './ActionCreators'
import reducer from './Reducer'

const store = createStore(reducer)
export default store
