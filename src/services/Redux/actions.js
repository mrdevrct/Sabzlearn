import apiRequest from '../Axios/config';

export const setCourses = (courses) => ({
  type: 'SET_COURSES',
  payload: courses
});

export const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users
});

export const setOpenMenu = (OpenMenu) => ({
  type: 'SET_OPENMENU',
  payload: OpenMenu
});

export const fetchCourses = () => {
  return async (dispatch) => {
    try {
      const response = await apiRequest.get('/courses');
      const courses = response.data;
      dispatch(setCourses(courses));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await apiRequest.get('/users');
      const users = response.data;
      dispatch(setUsers(users));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};