/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({
  id,
  classItem,
  done,
  description,
  createdItem,
  edit,
  onToggleCompleted,
  onDeletedTask,
  showEditTask,
  editItemTask,
  editSubmit,
}) => {
  const inputEdit = edit ? (
    <form className="new-todo-form" onSubmit={(event) => editSubmit(event, id)}>
      <input
        type="text"
        className="edit"
        autoFocus
        defaultValue={description}
        onChange={(event) => editItemTask(event.target.value)}
        onFocus={(event) => editItemTask(event.target.value)}
      />
    </form>
  ) : null;

  const dateCreateTask = formatDistanceToNow(createdItem, {
    includeSeconds: true,
    addSuffix: true,
  });

  return (
    <li key={id} className={`${classItem} + ' ' + ${edit}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={() => onToggleCompleted(id, classItem)}
          defaultChecked={!!done}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">Created {dateCreateTask}</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => showEditTask(id)}
          aria-labelledby="button edit"
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => onDeletedTask(id)}
          aria-labelledby="button delete"
        />
      </div>
      {inputEdit}
    </li>
  );
};
Task.propTypes = {
  id: PropTypes.number.isRequired,
  classItem: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  createdItem: PropTypes.number.isRequired,
  edit: PropTypes.string.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onDeletedTask: PropTypes.func.isRequired,
  showEditTask: PropTypes.func.isRequired,
  editItemTask: PropTypes.func.isRequired,
  editSubmit: PropTypes.func.isRequired,
};

export default Task;
