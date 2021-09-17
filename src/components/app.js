import React, { Component } from "react";

import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import Footer from "./Footer";

class App extends Component {
  maxId = 0;
  maxKey = 0;
  state = {
    displayFilter: 'all',
    editDescription: '',
    taskData: [],
    filterButtonData: [
      { id: 'b0', classSelect: "all", filterName: 'All', toggle: true },
      { id: 'b1', classSelect: 'active', filterName: 'Active', toggle: false },
      { id: 'b2', classSelect: 'completed', filterName: 'Completed', toggle: false }
    ]
  };

  filterItems = ( select ) => {
    if ( select === 'all' ) return this.state.taskData;
    if ( select === 'active' ) return this.state.taskData.filter( ( item ) => !item.done );
    if ( select === 'completed' ) return this.state.taskData.filter( ( item ) => item.done );
  };

  selectedButton = ( id, classSelect ) => this.setState( ( { filterButtonData } ) => {
    return {
      displayFilter: classSelect,
      filterButtonData: filterButtonData.map( ( elem ) => {
        elem.id === id ? elem.toggle = true : elem.toggle = false;
        return elem;
      } )
    };
  } );

  showEditTask = ( id ) => this.setState( ( { taskData } ) => {
    return taskData.map( ( item ) => item.id !== id && item.edit === 'editing' ? item.edit = '' : item.id === id ? item.edit = 'editing' : null );
  } );

  editItemTask = ( text ) => {
    this.setState( {
      editDescription: text
    } );
  };

  editSubmit = ( event, id ) => {
    event.preventDefault();
    if ( this.state.editDescription.length > 0 ) this.setState( ( { taskData, editDescription } ) => {
      return {
        taskData: taskData.map( item => {
          if ( item.id === id ) {
            item.description = editDescription;
            item.edit = '';
          }
          return item;
        } )
      };
    } );
  };

  createTodoItem( description ) {
    return {
      description,
      important: false,
      classItem: '',
      createdItem: Date.now(),
      done: false,
      edit: '',
      id: this.maxId++,
      keyTask: this.maxKey++
    };
  };

  addItem = ( text ) => {
    if ( text ) this.setState( ( { taskData } ) => {
      return { taskData: [...taskData, this.createTodoItem( text )] };
    } );
  };

  toggleCompleted = ( id, classItem ) => this.setState( ( { taskData } ) => {
    return {
      taskData: taskData.map( elem => {
        if ( elem.id === id ) {
          elem.done = !elem.done;
          classItem ? elem.classItem = '' : elem.classItem = "completed";
        }
        return elem;
      } )
    };
  } );

  deleteItem = ( id ) => this.setState( ( { taskData } ) => {
    return { taskData: taskData.filter( ( item, itemIdx ) => itemIdx !== taskData.findIndex( ( el ) => el.id === id ) ) };
  } );

  deleteCompletedList = () => this.setState( ( { taskData } ) => {
    return { taskData: taskData.filter( ( item ) => !item.done ) };
  } );

  render() {
    const { displayFilter, taskData, filterButtonData } = this.state;
    const countActiveTask = taskData.filter( ( el ) => !el.done ).length;
    return (
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm onItemAdded={ this.addItem }/>
          </header>
          <section className="main">
            <TaskList task={ this.filterItems( displayFilter ) }
                      onToggleCompleted={ this.toggleCompleted }
                      onDeleted={ this.deleteItem }
                      showEditTask={ this.showEditTask }
                      editItemTask={ this.editItemTask }
                      editSubmit={ this.editSubmit }
            />
            <Footer filterData={ filterButtonData }
                    onSelectedButton={ this.selectedButton }
                    deleteCompletedList={ this.deleteCompletedList }
                    countActiveTask={ countActiveTask }
            />
          </section>
        </section>
    );
  }
}

export default App;