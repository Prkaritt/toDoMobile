import {ADD_TASK, GET_TASKS,MARK_COMPLETED,DELETE_TASK} from './../constants/index';
import Emitter from '../services/emitter';

const initialState = {
    tasks : []
}

const taskReducer = (state=initialState,action)=>{
    switch(action.type){
        case ADD_TASK :
            const reducerList = Object.assign(action.payload)
            // console.log("Reducer",reducerList)
            Emitter.emit('newTaskAdded');
            return {reducerList}
        
        case GET_TASKS:
            // console.log("reducer",action.payload)
            return action.payload
        case MARK_COMPLETED:
            // console.log("id",action.payload.id,action.payload.marked)
            // tasks.find(task=>task.id == action.payload.id).isCompleted=action.payload.marked
           
            return action.payload 
            

        case DELETE_TASK : 
            // console.log("id",action.payload)
            // const position = tasks.findIndex(task=>task.id==action.payload);
            // tasks.splice(position,1);
            // console.log('position',position);
            return action.payload
            

        default:
            return state;
    }
}

export default taskReducer;