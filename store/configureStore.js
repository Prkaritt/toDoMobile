import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import taskReducer from '../reducers/taskReducer';

const rootReducer = combineReducers(
    {
        task : taskReducer
    }
)

const configureStore = ()=>{
    return createStore(rootReducer,applyMiddleware(thunk));
}

export default configureStore;