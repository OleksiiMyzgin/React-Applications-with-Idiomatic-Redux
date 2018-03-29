import { combineReducers } from 'redux';
import todo from './todo';

// [action.id] is - Computed property name

const byId = (state = {}, action) => {
  // console.log('byId state is ', state);
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  // console.log('allIds state is ', state);
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds,
});

export default todos;

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);

// function selectors with *get
export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  // console.log('allTodos is ', allTodos);
  switch (filter) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(t => t.completed);
    case 'active':
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
