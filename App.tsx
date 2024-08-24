/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Task, Tasks, TaskView } from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const SAMPLE_TASKS: string[] =
  `(A) Renew domains @pc
   (B) Write a PRD for BFTL @dev
   (C) Ask doc about sleep study @pc
   (D) Check out https://www.japanesepod101.com/
   (E) Drop mail @walk
   (F) Fix my bike @home or @LM
   (K) Ping nobody@example.com
   (M) About bookmarks -> https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Implement_a_settings_page @ideas
   (A) Milk @groceries
   (A) Assemble
   (B) Bake
   (C) Calculate
   (D) Dance
   (E) Explore
   (F) Fly
   (G) Grow
   (H) Hibernate
   (I) Investigate
   (J) Jog
   (K) Kiss
   (L) Laugh
   (M) Meditate
   (N) Navigate
   (O) Observe
   (P) Paint
   (Q) Question
   (R) Read
   (S) Sing
   (T) Travel
   (U) Unite
   (V) Venture
   (W) Write
   (X) X-ray
   (Y) Yell
   (Z) Zoom
   (A) End plant quarantine @home
   (A) Mop kitchen @home
   (A) Clear closet @home`.split('\n').map(s => s.trim());

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text>Yattaaaaa!</Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// const DATA: Task[] = SAMPLE_TASKS.map(Tasks.fromText);

const TaskInput = ({ text, onChangeText, onAddTask }) => (
  <>
    <View style={{flexDirection: 'row'}}>
      <Text>TODO: Make OK button</Text>
      <TextInput
        style={styles.taskInput}
        placeholder="Add Task"
        onChangeText={newText => { onChangeText(newText) }}
        onSubmitEditing={({ nativeEvent }) => onAddTask(nativeEvent.text)}
        autoCorrect={false}
        value={text}
      />
    </View>
  </>
);


function FreakingTaskList(): JSX.Element {
  const [newTaskText, setNewTaskText] = useState<string>('');

  const [taskData, setTaskData] = useState<Task[]>([]);

  const [isLoading, setLoading] = useState(true);

  const load = (async () => {
    if (!isLoading) return;

    let result;
    try {
      result = await AsyncStorage.getItem('tasks')
    } catch (e: any) {
      // FIXME: Pop friendly dialog
      console.error('loading tasks from AsyncStorage');
      console.error(e);
    }
    if (result) {
      const parsed = JSON.parse(result);
      setTaskData(parsed);
      setLoading(false);
    }
  });

  const save = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e: any) {
      // FIXME
    }
  };

  const byPriority = (a: Task, b: Task) => {
    if (a.priority === b.priority) {
      if (a.description === b.description) return 0
      return a.description > b.description ? 1 : -1;
    }
    return a.priority > b.priority ? 1 : -1;

  }

  const handleAddTask = async (task: string) => {
    const it: Task[] = [...taskData, {
      id: uuidv4(),
      uuid: uuidv4(),
      description: task,
      title: ' . ' + task,
      isCompleted: false,
      priority: 'C',
    }];
    await save('tasks', JSON.stringify(it));
    setTaskData(it);
    setNewTaskText('');
  };

  const handleToggleComplete = (item, index) => {
    const newItem = {
      ...taskData[index], // [newItem] = taskData.splice(index, 1);
      isCompleted: !taskData[index].isCompleted,
    };
    const newTaskData = [
      ...taskData.filter(i => i.uuid != item.uuid),
      newItem
    ];

    save('tasks', JSON.stringify(newTaskData)).then(() => setTaskData(newTaskData));
  };

  const handleSelectPriority = (priority: Letter, item, index) => {
    const newItem = {
      ...taskData[index],
      priority,
    };
    const newTaskData = [
      ...taskData.filter(i => i.uuid != item.uuid),
      newItem
    ];

    save('tasks', JSON.stringify(newTaskData)).then(() => setTaskData(newTaskData));
  }

  const renderItem = ({ item, index }) => /* !item.isCompleted && */ (
    <TaskView idx={index} task={item}
      handleSelectPriority={(priority) => { handleSelectPriority(priority, item, index) }}
      handleToggleComplete={() => handleToggleComplete(item, index)} />
  );

  load();

  return (
    <View style={styles.freakingTaskList}>
      <FlatList data={taskData.sort(byPriority)}
        renderItem={renderItem}
        keyExtractor={item => item.uuid} />
      <TaskInput
        text={newTaskText}
        onChangeText={setNewTaskText}
        onAddTask={handleAddTask} />
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FreakingTaskList></FreakingTaskList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  taskInput: {
    backgroundColor: 'white',
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    fontSize: 24,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  freakingTaskList: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default App;
