import React from "react";

const Task = ( { done, description, createdItem, edit, onToggleCompleted, onDeletedTask } ) => {

  const inputEdit = edit
      ? <input type="text" className="edit" defaultValue="Editing task"/>
      : null;
  return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox"
                 onClick={ onToggleCompleted }
                 defaultChecked={ !!done }
          />
          <label>
            <span className="description">{ description }</span>
            <span className="created">{ createdItem }</span>
          </label>
          <button className="icon icon-edit"/>
          <button className="icon icon-destroy" onClick={ onDeletedTask }/>
        </div>
        { inputEdit }
      </>
  );
};

export default Task;