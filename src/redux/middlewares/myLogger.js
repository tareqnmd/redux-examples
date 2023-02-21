import rootReducer from '../rootReducer';

const myLogger = (store) => (next) => (action) => {
	console.log('action', JSON.stringify(action));
	console.log('Before', JSON.stringify(store.getState()));

	const upcomingState = [action].reduce(rootReducer, store.getState());

	console.log('After', JSON.stringify(upcomingState));

	return next(action);
};

export default myLogger;
