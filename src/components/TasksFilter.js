import React from "react";
import PropTypes from 'prop-types';

const TasksFilter = ( { filterData, onSelectedButton } ) => {

  return filterData.map( item => {
    let { id, classSelect, filterName, toggle } = item;
    if ( toggle ) classSelect += ' selected';
    return (
        <li key={ id }>
          <button className={ classSelect }
                  onClick={ () => onSelectedButton( id, classSelect ) }
                  disabled={ toggle }
          >{ filterName }</button>
        </li>
    );
  } );

};
TasksFilter.propTypes = {
  filterData: PropTypes.arrayOf( PropTypes.object ).isRequired,
  onSelectedButton: PropTypes.func.isRequired,
};
export default TasksFilter;