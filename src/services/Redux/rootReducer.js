import { combineReducers } from 'redux';
import coursesReducer from './reducers/coursesReducer';
import usersReducer from './reducers/usersReducer';
import openMenuReducer from './reducers/openMenuReducer';

const rootReducer = combineReducers({
  courses: coursesReducer,
  users: usersReducer,
  OpenMenu: openMenuReducer
});

export default rootReducer;
