import { v4 } from 'node-uuid';
import { getIsFetching } from '../reducers';
import * as api from '../api';

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODO_REQUEST',
    filter,
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        response,
        filter,
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
