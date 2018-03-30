import { combineReducers } from 'redux';

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'REQUEST_TODOS':
        return true;
      case 'RECEIVE_TODOS':
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
  });
};

export default createList;

export const getIds = (state) => state.ids;
// console.log('getIds state is ', state);
// state is { ids:[array of ids], isFetching: false}

export const getIsFetching = (state) => state.isFetching;
// console.log('getIsFetching state is ', state);
// state is { ids:[array of ids], isFetching: false}
