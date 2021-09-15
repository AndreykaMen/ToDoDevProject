import React from "react";

const TasksFilter = ( { filterData, onSelectedButton } ) => {
  return filterData.map( item => {
    let { id, classSelect, filterName, toggle } = item;
    if ( toggle ) classSelect += ' selected';
    return (
        <li key={ id }>
          <button className={ classSelect }
                  onClick={ () => onSelectedButton( id, classSelect ) }>{ filterName }</button>
        </li>
    );
  } );

};

export default TasksFilter;