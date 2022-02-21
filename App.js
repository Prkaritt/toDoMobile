import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from './screens/TaskScreen';
import AddNewTask from './screens/AddNewTask';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const Stack = createNativeStackNavigator();
const store = configureStore();

export default function App() {
  return (
    
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TaskScreen" component={TaskScreen}/>
          <Stack.Screen name="newTask" component={AddNewTask}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
