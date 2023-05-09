import { taskAPI } from "../api/taskAPI";
import { CREATE_TASK_ACTION, DELETE_TASK_ACTION, GET_TASKS_ACTION, UPDATE_TASK_ACTION } from "../constants";
import { TTask, TUpdateTask } from "../types/index.type";

interface TaskState {
  tasks: TTask[] | [];
}

const initialState: TaskState = {
  tasks: [],
};

export function taskReducer(state = initialState, action: any): TaskState {
  switch (action.type) {
    case GET_TASKS_ACTION:
      return {
        ...state,
        tasks: action.tasks
      }
    case CREATE_TASK_ACTION:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      }
    case UPDATE_TASK_ACTION:
      return {
        ...state,
        tasks: action.tasks
      }
    case DELETE_TASK_ACTION:
      return {
        ...state,
        tasks: action.tasks
      }
    default:
      return state;
  }
}

export async function getAllTasks(): Promise<any> {
  try {
    const res: any = await taskAPI.getAllTasks();
    
    return Promise.resolve({
      success: true,
      data: res.data
    });

  } catch (error: any) {
    return Promise.resolve({
      success: false,
    });
  }
}

export async function createTask(createBody: TUpdateTask): Promise<any> {
  try {
    const res: any = await taskAPI.createTask(createBody);
    
    return Promise.resolve({
      success: true,
      data: res.data
    });

  } catch (error: any) {
    return Promise.resolve({
      success: false,
    });
  }
}

export async function updateTask(id: string, updateBody: TUpdateTask): Promise<any> {
  try {
    const res: any = await taskAPI.updateTask(id, updateBody);
    
    return Promise.resolve({
      success: true,
      data: res.data
    });

  } catch (error: any) {
    return Promise.resolve({
      success: false,
    });
  }
}

export async function deleteTask(id: string): Promise<any> {
  try {
    const res: any = await taskAPI.deleteTask(id);
    
    return Promise.resolve({
      success: true,
      data: res.data
    });

  } catch (error: any) {
    return Promise.resolve({
      success: false,
    });
  }
}