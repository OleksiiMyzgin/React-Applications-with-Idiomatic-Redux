import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';


const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;


// function selectors with *get
export const getVisibleTodos = (state, filter) => {
  // console.log('getVisibleTodos state is ', state, filter);
  // state is { byId:{id:{}, id:{}, id:{}}, listByFilter:{} }
  // listByFilter is {active:[], all:[], completed:[]}

  const ids = fromList.getIds(state.listByFilter[filter]);
  // console.log('ids is ', ids);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);
// console.log('getIsFetching state is ', state);
// console.log('getIsFetching filter is ', filter);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);
