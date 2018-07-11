import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from '../reducers/index'
import thunk from 'redux-thunk'

export default function configureStore() {
    const middleware = applyMiddleware(thunk)
    let store = createStore(reducers, middleware)  
    
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
        const nextRootReducer = combineReducers(reducers);
        store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}