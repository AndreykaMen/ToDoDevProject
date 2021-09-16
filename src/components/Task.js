import React from "react";
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ( {
                 id, classItem, done, description, createdItem,
                 edit, onToggleCompleted, onDeletedTask, showEditTask, editItemTask, editSubmit
               } ) => {
  const inputEdit = edit
      ?
      <form className="new-todo-form" onSubmit={ ( event ) => editSubmit( event, id ) }>
        <input type="text" className="edit"
               autoFocus
               defaultValue={ description }
               onChange={ ( event ) => editItemTask( event.target.value ) }
               onFocus={ ( event ) => editItemTask( event.target.value ) }
        />
      </form>
      : null;

  const dateCreateTask = formatDistanceToNow( createdItem, {
    includeSeconds: true,
    addSuffix: true
  } );

  return (
      <li key={ id } className={ classItem + ' ' + edit }>
        <div className="view">
          <input className="toggle" type="checkbox"
                 onClick={ () => onToggleCompleted( id, classItem ) }
                 defaultChecked={ !!done }
          />
          <label>
            <span className="description">{ description }</span>
            <span className="created">Created { dateCreateTask }</span>
          </label>
          <button className="icon icon-edit" onClick={ () => showEditTask( id ) }/>
          <button className="icon icon-destroy" onClick={ () => onDeletedTask( id ) }/>
        </div>
        { inputEdit }
      </li>
  );
};
Task.propTypes = {
  edit: PropTypes.string.isRequired,
  classItem: PropTypes.string.isRequired,
  dateCreateTask: PropTypes.string
};

export default Task;