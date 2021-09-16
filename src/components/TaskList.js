import React from "react";
import Task from "./Task";

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
        { taskElement }
      </ul>
  );
};
export default TaskList;