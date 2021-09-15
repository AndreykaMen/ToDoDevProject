import React, { Component } from "react";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import Footer from "./Footer";

export default class App extends Component {
  maxId = 0;
  state = {
    displayFilter: 'all',
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
      copyFilterButtonData,
    } );

  };

  createTodoItem( description ) {
    return {
      description,
      important: false,
      classItem: null,
      createdItem: "created 5 minutes ago",
      done: false,
      edit: false,
      id: this.maxId++
    };
  };

  addItem = ( text ) => {
    const newItem = this.createTodoItem( text );
    this.setState( ( { taskData } ) => {
      const newArr = [...taskData, newItem];
      return {
        taskData: newArr
      };
    } );
  };

  toggleCompleted = ( id, classItem ) => {
    const [...newStateTask] = this.state.taskData.map( ( elem ) => {
      if ( elem.id === id ) {
        elem.done = !elem.done;
        elem.classItem = "completed";
        if ( classItem ) elem.classItem = null;
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
};
