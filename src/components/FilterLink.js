import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const FilterLink = ({ filter, children }) => (
  <NavLink
    to={filter === 'all' ? '' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </NavLink>
);

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default FilterLink;
