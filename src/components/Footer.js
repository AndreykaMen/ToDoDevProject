import React from "react";
import TasksFilter from "./TasksFilter";

const Footer = ( { filter, onSelectedButton, deleteCompletedList, countActiveTask } ) => {
  return (
      <footer className="footer">
        <span className="todo-count">{ countActiveTask } items left</span>
        <ul className="filters">
          <TasksFilter filterData={ filter } onSelectedButton={ onSelectedButton }/>
        </ul>
        <button className="clear-completed" onClick={ deleteCompletedList }>Clear completed</button>
      </footer>
  );
};
export default Footer;

