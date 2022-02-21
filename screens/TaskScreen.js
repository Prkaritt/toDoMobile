import React,{useEffect, useLayoutEffect,useState} from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import Task from '../components/Task';
import AddNewTask from './AddNewTask';
import {} from 'redux';
import {useDispatch,useSelector} from 'react-redux';
import Emitter from '../services/emitter';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { markCompleted,deleteTaskAction,getTasks } from '../actions/tasks';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import tasks from './../tasks'

// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const TaskScreen = ({navigation})=>{
    
    const allTasks = Object.values(useSelector(state=>state.task));
    // const allTasks = useSelector(state=>state.task.tasks);
    // const [inCompleteTasks,setInCompleteTasks] = useState(allTasks.filter(task=>task.isCompleted==false))
    // const [completedTasks,setCompletedTasks] = useState(allTasks.filter(task=>task.isCompleted==true))

    const [inCompleteTasks,setInCompleteTasks] = useState([])
    const [completedTasks,setCompletedTasks] = useState([])



    const dispatch = useDispatch();

    
    useEffect(
        ()=>{
            dispatch(getTasks());
            // console.log("selectorTasks",allTasks);
            // Emitter.on('newTaskAdded',()=>setInCompleteTasks(allTasks.filter(task=>task.isCompleted==false)))
            // Emitter.on('newTaskAdded',()=>console.log("selectorTasks",allTasks))
            // console.log("IMP",allTasks.filter(task=>task.isCompleted==false))
            // console.log("Selector",allTasks);
            // console.log("IMP",importedTask)
            // console.log("selectorTasks",allTasks)
            // const newArray = Object.values(allTasks);
            // console.log('newArray',newArray);

            setInCompleteTasks(allTasks.filter(task=>task.isCompleted==false));
            setCompletedTasks(allTasks.filter(task=>task.isCompleted==true))
            // console.log("Complete",completedTasks);
            // console.log("Incomplete",inCompleteTasks);
            // console.log("USEEFFECT IN USE",allTasks)
            // return ()=>Emitter.off('newTaskAdded');
        }
        ,[JSON.stringify(allTasks)])
    

    // const allTasks = useSelector(state=>state.task.tasks)
    

    const taskComplete = (id,marked)=>{
            
        // setCompletedTasks(completedTasks.filter(task=>task.id==id));
        // console.log(completedTasks)
        // console.log(id,marked)
        dispatch(markCompleted(id,marked));
        // inCompleteTasks.find(task=>task.id==id).isCompleted=true;
        setInCompleteTasks(allTasks.filter(task=>task.isCompleted==false));
        setCompletedTasks(allTasks.filter(task=>task.isCompleted==true))
                  
    }

    const deleteTask = (id)=>{

        dispatch(deleteTaskAction(id));
        setInCompleteTasks(allTasks.filter(task=>task.isCompleted==false));
        setCompletedTasks(allTasks.filter(task=>task.isCompleted==true))


    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle : "My Tasks",
            headerStyle : { backgroundColor : "#0069c0"},
            headerTitleStyle : {color : "white",fontSize : 20},
            headerTintColor : "white",
            headerRight : ()=><TouchableOpacity onPress={()=>navigation.navigate("newTask")}>
                <AntDesign name="edit" size={24} color ="white" />
                </TouchableOpacity>
        })
    },[])

    return(
        <Tab.Navigator screenOptions={{headerShown : false}}
            header ={()=>{}}
            headerStyle ={{height : 0}}

            >
            <Tab.Screen name="Incomplete" options={{tabBarLabel:"Incomplete Tasks",
            tabBarIcon: ({color}) => (
                <Entypo name="cross" color={color} size={24} />
              ),
        
            }} children={()=>
            inCompleteTasks.length==0?<View style={styles.center}><Text>Congrats👑 You're done for the day</Text></View>:   
            <ScrollView style={styles.container}>
                <View style={styles.row}>
                    {inCompleteTasks.map((task,index)=><Task navigation={navigation} task={task} key={task.id} sn={index} taskComplete={taskComplete} deleteTask={deleteTask}/>)}
                
                </View>

                
            </ScrollView>}/>
            <Tab.Screen name="Completed" options={{
                tabBarLabel : "Completed Tasks",
                tabBarIcon: ({color}) => (
                    <AntDesign name="check" size={24} color={color} />
                  ),
            }}children={()=>
                completedTasks.length==0?<View style={styles.center}><Text>You Havent Completed any task!!</Text></View>:
                <ScrollView style={styles.container}>
                    <View style={styles.row}>
                        {completedTasks.map((task,index)=><Task navigation={navigation} task={task} key={task.id} sn={index} taskComplete={taskComplete} deleteTask={deleteTask}/>)}
                    
                    </View>
    
                    
                </ScrollView>}/>
        </Tab.Navigator>
        // <View><Text>TASKSSCREEN</Text></View>
        
    )
}

const screen = ()=>{
    return 
}

const styles = StyleSheet.create({
    center:{
        flex : 1,
        justifyContent: 'center',
        alignItems : 'center'
    },
    container : {
        padding : 30
    },
    row:{
        flexDirection : "row",
        flexWrap : 'wrap',
        justifyContent : 'space-between'
    }

})

export default TaskScreen;