import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from './TaskList.module.css';
import { getAllTasks } from "../../store/taskReducer";
import { GET_TASKS_ACTION } from "../../constants";
import { TSuccessPromise, TTask } from "../../types/index.type";
import { Task } from "./Task";
import { Filter } from "../Filter/Filter";

export const TaskList = () => {
  const [tasks, setTasks] = useState<TTask[] | []>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllTasks().then(({ success, data }: TSuccessPromise) => {
      if (success) {
        dispatch({ type: GET_TASKS_ACTION, tasks: data });
        setTasks(data);
      }
    })
  }, [dispatch]);

  if(!tasks || !tasks.length) {
    return (
      <div className={`${styles.wrapper} ${styles.empty}`}>
        You have not tasks
      </div>
    )
  }

  return (
    <>
      <Filter setTasks={setTasks} />
      <div className={styles.wrapper}>
        <Task tasks={tasks} setTasks={setTasks} />
      </div>
    </>
    
  )
}