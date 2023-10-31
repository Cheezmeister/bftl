import React, { useState } from 'react';
import {
    GestureResponderEvent,
    Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { v4 as uuidv4 } from 'uuid';

type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' |
              'G' | 'H' | 'I' | 'J' | 'K' | 'L' |
              'M' | 'N' | 'O' | 'P' | 'Q' | 'R' |
              'S' | 'T' | 'U' | 'V' | 'W' | 'X' |
              'Y' | 'Z';

export interface Task {
  id: string; // FIXME
  uuid: string;
  description: string;
  title: string; // FIXME: Is this redundant? Probably.
  isCompleted: boolean;
  priority: Priority;
  letter: Letter;
}

export const Tasks = {
  fromText : (text: string) => {
    const re = /(^\(\w\) )?([^@#]*)(@\w* ?)*/;
    const [fulltext, priorityLetter, basetext, tags] = text.match(re);

    const letter = priorityLetter?.substr(1,1);

    const priority = letter;

    return {
      id: uuidv4(),
      uuid: uuidv4(),
      description: basetext,
      title: ' . ' + text,
      isCompleted: false,
      priority,
      letter,
    };
  }
};

type Priority = Letter;

const priorityColorMap = {
  'F':  '#ccc',
  'E':  '#cfc',
  'D':  '#afa',
  'C':  '#ffa',
  'B':  '#faa',
  'A':  '#f88',
};

type PriorityProps = { priority: Priority };
export const PriorityView = ({ priority }: PriorityProps) => (
  <View style={{ ...styles.priorityContainer,
                 backgroundColor: priorityColorMap[priority] || '#ccc',
                 borderColor: '#ccc' }}>
    <Text>{priority}</Text>
  </View>
);

type TaskProps = { idx: number, task: Task, handleOnPress: (e: GestureResponderEvent)=>void };

export const TaskView = ({ idx, task, handleOnPress }: TaskProps) => (
  <View style={{ margin: 2, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
    <Pressable onPress={handleOnPress}>
      <View style={styles.checkbox}></View>
    </Pressable>
    <PriorityView letter={task.letter} priority={task.priority}></PriorityView>
    <Text style={{}}>{task.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  checkbox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    width: 24,
    height: 24
  },
  priorityContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    padding: 8
  }
});
