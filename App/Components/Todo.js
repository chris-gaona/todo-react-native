import React from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import Separator from "./Separator";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 15
  },
  item: {
    fontSize: 25,
    color: "#4d4d4d",
  },
  text: {
    flex: 1,
    marginHorizontal: 10,
  },
  complete: {
    textDecorationLine: "line-through"
  },
  destroy: {
    fontSize: 20,
    color: "#cc9a9a"
  }
});

const Todo = props => {

  const { complete } = props.item;

  return (
    <View>
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={props.onComplete}/>
        <View style={styles.text}>
          <Text style={[styles.item, complete && styles.complete]}>
            {props.item.text}
          </Text>
        </View>
        <TouchableOpacity onPress={props.onRemove}>
          <Text style={styles.destroy}>X</Text>
        </TouchableOpacity>
      </View>
      <Separator/>
    </View>
  )
};

export default Todo;