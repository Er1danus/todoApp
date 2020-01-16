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
      ],
      term: '',
      filter: '' //all, active, done
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

    this.onLabelSearch = (term) => {
      this.setState({term})
    }

    this.onFilterChange = (filter) => {
      this.setState({filter})
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

  search(items, term) {
    if(term.length === '') {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
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
    const { todoData, term, filter} = this.state;

    const visibleItems = this.filter(this.search(todoData,term), filter)

    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader todo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel onLabelSearch={this.onLabelSearch}/>
          <ItemStatusFilter filter={filter}
            onFilterChange={this.onFilterChange}/>
        </div>
        <TodoList todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}/>
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};
