import React, { useState } from 'react';
import {
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

    const priority = priorityKey[ letter ] ?? Priority.NONE;

    const randomPri = [Priority.LOW, Priority.LOWEST, Priority.MEDIUM, Priority.HIGH, Priority.HIGHEST][(Math.floor(Math.random() * 5))];
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

enum Priority {
  HIGHEST,
  HIGH,
  MEDIUM,
  LOW,
  LOWEST,
  NONE,
}

const priorityColorMap = {
  [Priority.NONE]:  '#ccc',
  [Priority.LOWEST]:  '#cfc',
  [Priority.LOW]:  '#afa',
  [Priority.MEDIUM]:  '#ffa',
  [Priority.HIGH]:  '#faa',
  [Priority.HIGHEST]:  '#f88',
};

const priorityKey = {
  A: Priority.HIGHEST,
  B: Priority.HIGH,
  C: Priority.MEDIUM,
  D: Priority.LOW,
  E: Priority.LOWEST,
  F: Priority.NONE,
};

type PriorityProps = { letter: Letter, priority: Priority };
export const PriorityView = ({ letter, priority }: PriorityProps) => (
  <View style={{ ...styles.priorityContainer,
                 backgroundColor: priorityColorMap[priority],
                 borderColor: '#ccc' }}>
    <Text>{letter}</Text>
  </View>
);

type TaskProps = { idx: number, task: Task };

export const TaskView = ({ idx, task }: TaskProps) => (
  <View style={{ margin: 2, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
    <View style={styles.checkbox}></View>
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
