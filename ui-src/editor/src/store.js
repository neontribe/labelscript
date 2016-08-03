import { createStore } from 'redux';
import rootReducer from './reducers.js';

function configureStore() {
	var store = createStore(rootReducer)
	return store
}

export default configureStore();
