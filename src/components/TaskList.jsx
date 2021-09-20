import React from "react";
import Task from "./Task";
import PropTypes from "prop-types";

const TaskList = ( { task, onToggleCompleted, onDeleted, showEditTask, editItemTask, editSubmit } ) => {
  const taskElement = task.map( item => {
    const { keyTask, ...taskProps } = item;
    return (
        <Task key={ keyTask + 'li' }
              onToggleCompleted={ onToggleCompleted }
              onDeletedTask={ onDeleted }
              showEditTask={ showEditTask }
              editItemTask={ editItemTask }
              editSubmit={ editSubmit }
              { ...taskProps }
        />
    );
  } );
  return (
      <ul className="todo-list">
        { taskElement.reverse() }
      </ul>
  );
};

TaskList.propTypes = {
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  showEditTask: PropTypes.func.isRequired,
  editItemTask: PropTypes.func.isRequired,
  editSubmit: PropTypes.func.isRequired,
  taskElement: PropTypes.element,
  task: PropTypes.arrayOf( PropTypes.object ).isRequired,

};
export default TaskList;