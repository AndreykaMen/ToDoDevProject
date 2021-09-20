import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  onLabelChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { onItemAdded } = this.props;
    const { description } = this.state;
    event.preventDefault();
    onItemAdded(description);
    this.setState({
      description: '',
    });
  };

  render() {
    const { description } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={description}
        />
      </form>
    );
  }
}
NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
