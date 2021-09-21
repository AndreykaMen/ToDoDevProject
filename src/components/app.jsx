import React, { Component } from 'react';

import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';
import Footer from './Footer';

class App extends Component {
  maxId = 0;

  maxKey = 0;
  state = {
    displayFilter: 'all',
    editDescription: '',
    taskData: [],
    filterButtonData: [
      { id: 'b0', classSelect: 'all', filterName: 'All', toggle: true },
      { id: 'b1', classSelect: 'active', filterName: 'Active', toggle: false },
      { id: 'b2', classSelect: 'completed', filterName: 'Completed', toggle: false },
    ],
  };

  filterItems = (select) => {
    const { taskData } = this.state;
    if (select === 'all') return taskData;
    if (select === 'active') return taskData.filter((item) => !item.done);
    if (select === 'completed') return taskData.filter((item) => item.done);
  };

  selectedButton = (id, classSelect) =>
    this.setState(({ filterButtonData }) => ({
      displayFilter: classSelect,
      filterButtonData: filterButtonData.map((elem) => {
        elem.toggle = elem.id === id;
        return elem;
      }),
    }));

  showEditTask = (id) =>
    this.setState(({ taskData }) =>
      taskData.map((item) =>
        item.id !== id && item.edit === 'editing' ? (item.edit = '') : item.id === id ? (item.edit = 'editing') : null
      )
    );

  editItemTask = (text) =>
    this.setState({
      editDescription: text,
    });

  editSubmit = (event, id) => {
    const { editDescription } = this.state;
    event.preventDefault();
    if (editDescription.length > 0) {
      this.setState(({ taskData, editDescription }) => ({
        taskData: taskData.map((item) => {
          if (item.id === id) {
            item.description = editDescription;
            item.edit = '';
          }
          return item;
        }),
      }));
    }
  };

  toggleCompleted = (id, classItem) =>
    this.setState(({ taskData }) => ({
      taskData: taskData.map((elem) => {
        if (elem.id === id) {
          elem.done = !elem.done;
          elem.classItem = 'completed';
          if (classItem) elem.classItem = '';
        }
        return elem;
      }),
    }));

  deleteItem = (id) =>
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((item, itemIdx) => itemIdx !== taskData.findIndex((el) => el.id === id)),
    }));

  deleteCompletedList = () =>
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((item) => !item.done),
    }));

  createTodoItem = (textDescriptor) => ({
    description: textDescriptor,
    important: false,
    classItem: '',
    createdItem: Date.now(),
    done: false,
    edit: '',
    id: this.maxId++,
    keyTask: this.maxKey++,
  });

  addItem = (text) => {
    if (text) {
      this.setState(({ taskData }) => ({ taskData: [...taskData, this.createTodoItem(text)] }));
    }
  };

  render() {
    const { displayFilter, taskData, filterButtonData } = this.state;
    const countActiveTask = taskData.filter((el) => !el.done).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            task={this.filterItems(displayFilter)}
            onToggleCompleted={this.toggleCompleted}
            onDeleted={this.deleteItem}
            showEditTask={this.showEditTask}
            editItemTask={this.editItemTask}
            editSubmit={this.editSubmit}
          />
          <Footer
            filterData={filterButtonData}
            onSelectedButton={this.selectedButton}
            deleteCompletedList={this.deleteCompletedList}
            countActiveTask={countActiveTask}
          />
        </section>
      </section>
    );
  }
}

export default App;
