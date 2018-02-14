/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Keyboard, Platform, StyleSheet, View} from 'react-native';
import Header from "./App/Components/Header";
import Footer from "./App/Components/Footer";
import Todo from "./App/Components/Todo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  list: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  }
});

type Props = {};

let allItems = [];

const filterItems = (filter) => {
  return allItems.filter(item => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return item.complete;
    if (filter === "ACTIVE") return !item.complete;
  })
};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      allComplete: false,
      value: "",
      items: [],
      filter: "ALL"
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    const filteredItems = filterItems(filter);

    this.setState({
      items: filteredItems,
      filter: filter
    });
  }

  handleRemoveItem(key) {
    allItems = allItems.filter(item => {
      return item.key !== key;
    });

    this.setState({
      items: filterItems(this.state.filter)
    })
  }

  handleToggleComplete(key, complete) {
    allItems = allItems.map(item => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      }
    });

    this.setState({
      items: filterItems(this.state.filter)
    });
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    allItems = allItems.map(item => ({
      ...item,
        complete
    }));

    this.setState({
      items: filterItems(this.state.filter),
      allComplete: complete
    });
  }

  handleAddItem() {
    if (!this.state.value) return;

    allItems.push({
      key: Date.now().toString(),
      text: this.state.value,
      complete: false
    });

    this.setState({
      items: filterItems(this.state.filter),
      value: ""
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({value})}
          onToggleAllComplete={this.handleToggleAllComplete}/>
        <FlatList
          style={styles.list}
          data={this.state.items}
          renderItem={({item}) => <Todo onComplete={(complete) => this.handleToggleComplete(item.key, complete)} onRemove={() => this.handleRemoveItem(item.key)} item={item}/>}
          onScroll={() => Keyboard.dismiss()}
        />
        <Footer filter={this.state.filter} onFilter={this.handleFilter}/>
      </View>
    );
  }
}
