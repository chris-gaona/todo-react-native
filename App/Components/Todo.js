import React from 'react';
import {StyleSheet, Switch, Text, View} from "react-native";
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
      </View>
      <Separator/>
    </View>
  )
};

export default Todo;