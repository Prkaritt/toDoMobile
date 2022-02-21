import React,{useLayoutEffect,useState} from 'react';
import {View, Text,StyleSheet,KeyboardAvoidingView} from 'react-native';
import { Input,Button } from 'react-native-elements';
import { addTask } from '../actions/tasks';
import {useDispatch} from 'react-redux';
import Emitter from '../services/emitter';


const AddNewTask = ({navigation})=>{    
    const [input,setInput] = useState("");
    const dispatch = useDispatch();
    

    const addItem = ()=>{
        dispatch(addTask(input));
        // Emitter.emit('newTaskAdded');
        navigation.goBack();
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle : "Tasks",
            headerTitle : "Add New Task"
        })
    },[])

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.inputContainer}>
                <Input placeholder="Enter The Task Name" value={input} onChangeText={(text)=>setInput(text)}/>
            </View>
            <Button style={styles.button} title="Add" onPress={addItem}/>
        </KeyboardAvoidingView>
    )
}

export default AddNewTask;

const styles = StyleSheet.create({
    container :{
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    inputContainer :{
        width : 300
    },
    button : {
        width : 200
    }
})