import React, {useState} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {v4 as uuidv4} from 'uuid';

import Dialog from './Dialog';

type Letter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

type Priority = Letter;

const ALL_LETTERS: Letter[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
  fromText: (text: string) => {
    const re = /(^\(\w\) )?([^@#]*)(@\w* ?)*/;
    const [fulltext, priorityLetter, basetext, tags] = text.match(re);

    const letter = priorityLetter?.substr(1, 1);

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
  },
};

const priorityColorMap = {
  F: '#ccc',
  E: '#cfc',
  D: '#afa',
  C: '#ffa',
  B: '#faa',
  A: '#f88',
};

type PriorityProps = {priority: Priority};
export const PriorityView = ({priority}: PriorityProps) => (
  <View
    style={{
      ...styles.priorityContainer,
      backgroundColor: priorityColorMap[priority] || '#ccc',
      borderColor: '#ccc',
    }}>
    <Text style={styles.priorityLabel}>{priority}</Text>
  </View>
);

type TaskProps = {
  idx: number;
  task: Task;
  handleToggleComplete: (e: GestureResponderEvent) => void;
  handleSelectPriority: (e: GestureResponderEvent) => void;
};

`

      <Dialog
        visible={isDialogVisible}
        onClose={hideDialog}
        title="Popup Title"
        content="This is the content of the popup dialog."
      />
`;

export function TaskView({
  idx,
  task,
  handleToggleComplete,
  handleSelectPriority,
}: TaskProps) {
  const [isPriorityModalVisible, setPriorityModalVisible] = useState(false);
  const handleTapPriorityWrapper = () => {
    setPriorityModalVisible(true);
  };
  const hideDialog = () => {
    setPriorityModalVisible(false);
  };

  if (!handleSelectPriority) {
    throw "WAT";
  }

  const onSelectPriority = priority => {
    hideDialog();
    handleSelectPriority(priority);
  };

  return (
    <View
      key={task.uuid}
      style={{margin: 2, flexDirection: 'row', alignItems: 'center', gap: 4}}
    >
      <Pressable onPress={handleToggleComplete}>
        <View style={styles.checkbox}>
          {task.isCompleted && <Text>☑️</Text>}
        </View>
      </Pressable>
      <Pressable onPress={handleTapPriorityWrapper}>
        <PriorityView priority={task.priority}></PriorityView>
      </Pressable>
      <Dialog
        visible={isPriorityModalVisible}
        onClose={() => hideDialog()}
        title="Priority"
        description="Set Priority">
        <View
          style={{
            display: 'grid',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {ALL_LETTERS.map(priority => (
            <Pressable
              key={priority}
              onPress={() => onSelectPriority(priority)}
            >
              <PriorityView
                style={{margin: '16px'}}
                priority={priority}
              />
            </Pressable>
          ))}
        </View>
      </Dialog>
      <Text style={{}}>{task.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    width: 24,
    height: 24,
  },
  priorityContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    padding: 8,
  },
  priorityLabel: {
    textAlign: 'center',
  },
});
