import React, { Component } from "react";

export default class NewTaskForm extends Component {

  state = {
    description: ''
  };

  onLabelChange = ( event ) => {
    this.setState( {
      description: event.target.value
    } );
  };

  onSubmit = ( event ) => {
    event.preventDefault();
    this.props.onItemAdded( this.state.description );
    this.setState( {
      description: ''
    } );
  };

  render() {
    return (
        <form className="new-todo-form" onSubmit={ this.onSubmit }>
          <input className="new-todo" placeholder="What needs to be done?"
                 autoFocus
                 onChange={ this.onLabelChange }
                 value={ this.state.description }
          />
        </form>
    );
  }

};
