import React from "react";

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
  return (
      <li key={ id } className={ classItem + ' ' + edit }>
        <div className="view">
          <input className="toggle" type="checkbox"
                 onClick={ () => onToggleCompleted( id, classItem ) }
                 defaultChecked={ !!done }
          />
          <label>
            <span className="description">{ description }</span>
            <span className="created">{ createdItem }</span>
          </label>
          <button className="icon icon-edit" onClick={ () => showEditTask( id ) }/>
          <button className="icon icon-destroy" onClick={ () => onDeletedTask( id ) }/>
        </div>
        { inputEdit }
      </li>
  );
};

export default Task;