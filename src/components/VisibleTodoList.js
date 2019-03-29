import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);// .then(() => console.log('done!'))
  }

  render() {
    const {
      toggleTodo, errorMessage, todos, isFetching,
    } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};


const mapStateToProps = (state, { match: { params: { filter } } }) => ({
  todos: getVisibleTodos(state, filter || 'all'),
  errorMessage: getErrorMessage(state, filter || 'all'),
  isFetching: getIsFetching(state, filter || 'all'),
  filter: filter || 'all',
});

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions,
)(VisibleTodoList));

export default VisibleTodoList;
