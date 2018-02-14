/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Keyboard, Platform, StyleSheet, View, AsyncStorage, ActivityIndicator} from 'react-native';
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
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.2)"
  }
});

type Props = {};

const filterItems = (filter, items) => {
  return items.filter(item => {
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
      dataSource: [],
      filter: "ALL",
      loading: true
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem("items").then(json => {
      try {
        const items = JSON.parse(json);
        if (items !== null) {
          this.setSource(items, items, {loading: false});
        } else {
          this.setState({
            loading: false
          })
        }
      } catch (e) {
        this.setState({
          loading: false
        })
      }
    });
  }

  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: itemsDatasource,
      ...otherState
    });

    AsyncStorage.setItem("items", JSON.stringify(items));
  }

  handleClearComplete() {
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), {filter});
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter(item => {
      return item.key !== key;
    });

    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      }
    });

    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ...item,
        complete
    }));

    this.setSource(newItems, filterItems(this.state.filter, newItems), {allComplete: complete});
  }

  handleAddItem() {
    if (!this.state.value) return;

    const newItems = [
      ...this.state.items,
      {
        key: Date.now().toString(),
        text: this.state.value,
        complete: false
      }
    ];

    this.setSource(newItems, filterItems(this.state.filter, newItems), {value: ""});
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
          data={this.state.dataSource}
          renderItem={({item}) => <Todo onComplete={(complete) => this.handleToggleComplete(item.key, complete)} onRemove={() => this.handleRemoveItem(item.key)} item={item}/>}
          onScroll={() => Keyboard.dismiss()}
        />
        <Footer
          count={filterItems("ACTIVE", this.state.items).length}
          filter={this.state.filter}
          onFilter={this.handleFilter}
          onClearComplete={this.handleClearComplete}/>
        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"/>
        </View>}
      </View>
    );
  }
}
