import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css'

export default class App extends Component {

  maxId = 100

  constructor() {
    super();

    this.state = {
      todoData: [
        this.createTodoIteam('Drink Coffee'),
        this.createTodoIteam('Create New App'),
        this.createTodoIteam('Have a lunch'),
      ]
    };

    this.deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
        return {
          todoData: newArray
        }
      });
    }


    this.addItem = (text) => {
      const newItem = this.createTodoIteam(text);
      this.setState(({todoData}) => {
        const newArr = [
          ...todoData,
          newItem
        ]
        return {
          todoData: newArr
        }
      })
    }
    this.onToggleDone = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = {...oldItem, done: !oldItem.done}
        const newArray = [...todoData.slice(0, idx),
          newItem,
          ...todoData.slice(idx + 1)]
        return {
          todoData: newArray
        }
      })
    }

    this.onToggleImportant = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = {...oldItem, important: !oldItem.important}
        const newArray = [...todoData.slice(0, idx),
          newItem,
          ...todoData.slice(idx + 1)]
        return {
          todoData: newArray
        }
      })
    }
  }

  createTodoIteam(label){
    return {
      label,
      important: false,
      id: this.maxId++
    };
  }

  render() {

    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader todo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}/>
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};
