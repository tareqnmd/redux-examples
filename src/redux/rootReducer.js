import { combineReducers } from 'redux';
import filterReducer from './filters/filterReducer';
import todoReducer from './todos/todoReducer';

const rootReducer = combineReducers({ todo: todoReducer, filter: filterReducer });

export default rootReducer;
