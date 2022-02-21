import { StyleSheet, Text, View } from 'react-native';
import React,{useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NavigationHelpersContext } from '@react-navigation/native';



const Task = ({sn,task,navigation,taskComplete,setTaskAdded,taskAdded,deleteTask}) => {

  const [marked,setMarked] = useState(task.isCompleted);
  const toggleMarked = ()=>{
    setMarked(marked=>!marked)
    taskComplete(task.id,!marked);//Send updated value because previous version of marked is sent at first
    
  }

  

  

  return (

    <TouchableOpacity><View style={styles.container}>
      
      <View style={styles.top}>
        <View style={{backgroundColor:"#0069c0",paddingVertical : 5, paddingHorizontal : 10,borderRadius : 10}}><Text style={styles.taskText}>{sn+1}</Text></View>

        <TouchableOpacity onPress={()=>toggleMarked()}><Ionicons name="checkmark-circle" size={24} style={marked?styles.marked:styles.icon} /></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("newTask",{setTaskAdded:setTaskAdded,taskAdded:taskAdded})}><AntDesign name="edit" size={24} style={styles.icon} /></TouchableOpacity>
      </View>
      <View style={styles.middle}>
        <Text style={styles.taskText}>{task.name}</Text>
      </View>
      <View style={styles.bottom}>
      <TouchableOpacity onPress={()=>{deleteTask(task.id)}}><AntDesign name="delete" size={24} style={styles.icon} /></TouchableOpacity>
      </View>
    </View></TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
    container : {
        height : 150,
        width : 150,
        backgroundColor : "#2196f3",
        marginBottom : 30,
        borderRadius : 10,
        padding : 10,
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    top :{
      flexDirection : 'row',
      justifyContent : 'space-around',
      alignItems : 'center',
      width : "100%"
    },
    icon :{
      color : "#0069c0"
    },
    taskText :{
      color : "white",
      fontSize : 20,
      fontWeight : 'bold',
      
    },
    marked : {
      color : "white"
    }
});
