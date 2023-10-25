/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import uuid from 'react-native-uuid';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Task, Tasks, TaskView } from './Task';

import AsyncStorage from '@react-native-async-storage/async-storage';

import QRCode from 'qrcode.react'; // FIXME

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

enum Priority {
  HIGHEST,
  HIGH,
  MEDIUM,
  LOW,
  LOWEST,
  NONE,
}

const DATA: Task[] = SAMPLE_TASKS.map(Tasks.fromText);

const TaskInput = ({ text, onChangeText, onAddTask }) => (
  <>
    <TextInput
      style={styles.taskInput}
      placeholder="Add Task"
      onChangeText={newText => { onChangeText(newText) }}
      onSubmitEditing={({ nativeEvent }) => onAddTask(nativeEvent.text)}
      autoCorrect={false}
      value={text}
    />
  </>
);


function FreakingTaskList(): JSX.Element {
  const renderItem = ({ item, index }) => (
    <TaskView idx={index} task={item} />
  );
  const [newTaskText, setNewTaskText] = useState<string>('');

  const [taskData, setTaskData] = useState<Task[]>(DATA);

  const [isLoading, setLoading] = useState(true);

  const load = (async () => {
    try {
      const result = await AsyncStorage.getItem('tasks')
    } catch (e: any) {
      // FIXME
      /* setTaskData([...taskData, { */
      /*   id: uuidv4(), */
      /*   uuid: uuidv4(), */
      /*   description: `oh noez! ${e}`, */
      /*   title: `oh noez! ${e}`, */
      /*   isCompleted: false, */
      /*   priority: Priority.MEDIUM, */
      /* }]); */
    }
  });

  const save = async (value) => {
    try {
      await AsyncStorage.setItem('tasks', taskData);
    } catch (e: any) {
      // FIXME
    }
  };

  const handleAddTask = (task: string) => {
    setTaskData([...taskData, {
      id: uuidv4(),
      uuid: uuidv4(),
      description: task,
      title: ' . ' + task,
      isCompleted: false,
      priority: Priority.MEDIUM,
    }]);
  };

  return (
    <View style={styles.freakingTaskList}>
      <FlatList data={taskData}
        renderItem={renderItem}
        keyExtractor={item => item.uuid} />
      <TaskInput text={newTaskText} onChangeText={setNewTaskText} onAddTask={handleAddTask} />
    </View>
  );
}

const DefaultContent = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section title="Step One">
          Edit <Text style={styles.highlight}>This sproinking file</Text> to change this
          screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />
      </View>
    </ScrollView>
  );
};


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
