import {createStore, applyMiddleware} from 'redux'
import initialize from './ActionCreators'
import reducer from './Reducer'
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk))
export default store
