import React from 'react';
import {StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";
import Separator from "./Separator";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 15,
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
  },
  inputContainer: {
    flex: 1,
    height: 40,
    padding: 0,
  },
  input: {
    padding: 6,
    fontSize: 24,
    color: "#4d4d4d",
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7be290",
    padding: 7
  },
  doneText: {
    color: "#4d4d4d",
    fontSize: 20,
  }
});

const Todo = props => {

  const { text, complete, editing } = props.item;

  const textComponent = (
    <TouchableOpacity style={styles.text} onLongPress={() => props.onToggleEdit(true)}>
      <Text style={[styles.item, complete && styles.complete]}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  const removeButton = (
    <TouchableOpacity onPress={props.onRemove}>
      <Text style={styles.destroy}>X</Text>
    </TouchableOpacity>
  );

  const editingComponent = (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={props.onUpdate}
        autoFocus
        value={text}
        style={styles.input}
        multiline/>
    </View>
  );

  const doneButton = (
    <TouchableOpacity style={styles.done} onPress={() => props.onToggleEdit(false)}>
      <Text style={styles.doneText}>Save</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={props.onComplete}/>

        {editing ? editingComponent : textComponent}

        {editing ? doneButton : removeButton}
      </View>
      <Separator/>
    </View>
  )
};

export default Todo;