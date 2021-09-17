import React, { Component } from "react";

import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import Footer from "./Footer";

export default class App extends Component {
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

  selectedButton = ( id, classSelect ) => {
    let [...copyFilterButtonData] = this.state.filterButtonData;
    copyFilterButtonData.map( ( elem ) => {
      elem.id === id ? elem.toggle = true : elem.toggle = false;
      return elem;
    } );
    this.setState( {
      displayFilter: classSelect,
      filterButtonData: copyFilterButtonData,
    } );
  };

  showEditTask = ( id ) => {
    const state = this.state.taskData;
    const [...editTask] = state.map( ( item ) => {
      if ( item.id !== id && item.edit === 'editing' ) {
        item.edit = '';
      }
      if ( item.id === id ) {
        item.edit = 'editing';
      }
      return item;
    } );
    this.setState( {
      taskData: editTask
    } );
  };

  editItemTask = ( text ) => {
    this.setState( {
      editDescription: text
    } );
  };

  editSubmit = ( event, id ) => {
    const editValue = this.state.editDescription;
    const state = this.state.taskData;
    event.preventDefault();
    if ( editValue.length > 0 ) {
      const [...editTask] = state.map( ( item ) => {
        if ( item.id === id ) {
          item.description = editValue;
          item.edit = '';
        }
        return item;
      } );
      this.setState( {
        taskData: editTask
      } );
    }
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
    if ( text ) {
      const newItem = this.createTodoItem( text );
      this.setState( ( { taskData } ) => {
        const newArr = [...taskData, newItem];
        return {
          taskData: newArr
        };
      } );
    }
  };

  toggleCompleted = ( id, classItem ) => {
    const [...newStateTask] = this.state.taskData.map( ( elem ) => {
      if ( elem.id === id ) {
        elem.done = !elem.done;
        elem.classItem = "completed";
        if ( classItem ) elem.classItem = '';
      }
      return elem;
    } );
    this.setState( {
      newStateTask
    } );
  };

  deleteItem = ( id ) => {
    this.setState( ( { taskData } ) => {
      const idx = taskData.findIndex( ( el ) => el.id === id );
      const copyTaskData = taskData.filter( ( item, itemIdx ) => {
        return itemIdx !== idx;
      } );
      return {
        taskData: copyTaskData
      };
    } );
  };

  deleteCompletedList = () => {
    this.setState( ( { taskData } ) => {
      taskData = taskData.filter( ( item ) => {
        return !item.done;
      } );
      return {
        taskData: taskData
      };
    } );
  };

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
            <Footer filter={ filterButtonData }
                    onSelectedButton={ this.selectedButton }
                    deleteCompletedList={ this.deleteCompletedList }
                    countActiveTask={ countActiveTask }
            />
          </section>
        </section>
    );
  }
}
;
