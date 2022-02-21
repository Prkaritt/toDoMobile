import {ADD_TASK,GET_TASKS,MARK_COMPLETED,DELETE_TASK} from './../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tasks = [];

(async()=>{
    try{
        const tasksFetched = await AsyncStorage.getItem('tasks');
        
        //  await AsyncStorage.setItem('tasks',[]);
        if(tasksFetched)
        {
            const tasksFetchedParsed = JSON.parse(tasksFetched);
            Object.assign(tasks,tasksFetchedParsed);
            
        }
    }catch(e){
        console.log(e)
    }
})()


// if(tasks){
//     console.log("TASKS",tasks)
// }



export const addTask =(taskName)=>async(dispatch)=>{
   
    const newTask= {
        id :'_' + Math.random().toString(36).substr(2, 9),
        name : taskName,
        isCompleted : false
    }
    if(tasks.length == 0){
        tasks.push(newTask);
        const tasksJSON = JSON.stringify(tasks);
        await AsyncStorage.setItem('tasks',tasksJSON)
        const fetchedData = await AsyncStorage.getItem('tasks');
        dispatch ({
            type : ADD_TASK,
            payload : tasks
        })
    }
    else{
        tasks.push(newTask);
        await AsyncStorage.removeItem('tasks');
        await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
        const fetchedData = await AsyncStorage.getItem('tasks');
        
        dispatch ({
            type : ADD_TASK,
            payload : tasks
        })
    }
    
    
    
    
}

// export const addTask =(taskName)=>(dispatch)=>{
//     const taskJSON = JSON.stringify({
//         id : 1,
//         name : taskName,
//         isCompleted : false
//         })
//     console.log(taskJSON)
//     dispatch ({
//         type : ADD_TASK,
//         payload : taskName
//     })
// }

export const getTasks = ()=>{
    // console.log("GET_TASK",tasks)
    return {
        type : GET_TASKS,
        payload : tasks
    }
}

export const deleteTaskAction = (id)=>async(dispatch)=>{
    const position = tasks.findIndex(task=>task.id==id);
    tasks.splice(position,1);
    await AsyncStorage.removeItem('tasks');
    await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
    return {
        type : DELETE_TASK,
        payload : tasks
    }
}

export const markCompleted = (id,marked)=>async(dispatch)=>{
    tasks.find(task=>task.id==id).isCompleted=marked;
    await AsyncStorage.removeItem('tasks');
    await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
    // console.log("MARKED",tasks);
    return {
        type : MARK_COMPLETED,
        payload : tasks
    }
}