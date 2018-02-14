/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform, FlatList, Text, Keyboard
} from 'react-native';
import Header from "./App/Components/Header";
import Footer from "./App/Components/Footer";
import Separator from "./App/Components/Separator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: "#fff",
  },
  item: {
    padding: 15,
    fontSize: 25,
    color: "#4d4d4d",
  }
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      allComplete: false,
      value: "",
      items: []
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ...item,
        complete
    }));

    this.setState({
      items: newItems,
      allComplete: complete
    });
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

    this.setState({
      items: newItems,
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
        <View style={styles.content}>
          <FlatList
            style={styles.list}
            data={this.state.items}
            renderItem={({item}) => <View><Text style={styles.item}>{item.text}</Text><Separator/></View>}
            onScroll={() => Keyboard.dismiss()}
          />
        </View>
        <Footer/>
      </View>
    );
  }
}
