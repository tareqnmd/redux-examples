import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';

const myLogger = (store) => (next) => (action) => {
	console.log('action', JSON.stringify(action));
	console.log('Before', JSON.stringify(store.getState()));

	const upcomingState = [action].reduce(rootReducer, store.getState());

	console.log('After', JSON.stringify(upcomingState));

	return next(action);
};

const store = createStore(rootReducer, applyMiddleware(myLogger));

export default store;
