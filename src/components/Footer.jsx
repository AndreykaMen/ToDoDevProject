import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from './TasksFilter';

const Footer = ({ filterData, onSelectedButton, deleteCompletedList, countActiveTask }) => (
  <footer className="footer">
    <span className="todo-count">{countActiveTask} items left</span>
    <ul className="filters">
      <TasksFilter filterData={filterData} onSelectedButton={onSelectedButton} />
    </ul>
    <button type="button" className="clear-completed" onClick= { deleteCompletedList }>
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  filterData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedButton: PropTypes.func.isRequired,
  deleteCompletedList: PropTypes.func.isRequired,
  countActiveTask: PropTypes.number.isRequired,
};
export default Footer;
