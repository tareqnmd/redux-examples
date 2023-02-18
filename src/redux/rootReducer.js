import { combineReducers } from 'redux';
import counterReducer from './counter/counterReducer';
import dynamicCounterReducer from './dynamicCounter/dynamicCounterReducer';

export const rootReducer = combineReducers({
	counter: counterReducer,
	dynamicCounter: dynamicCounterReducer,
});
