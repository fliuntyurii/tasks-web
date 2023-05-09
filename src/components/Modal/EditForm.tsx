import { Button, Input, InputNumber, Select, message } from 'antd';
import { useDispatch } from "react-redux";

import styles from './Modal.module.css';
import { TSuccessPromise, TTask } from '../../types/index.type';
import { DELETE_TASK_ACTION, MAX_SUM, MIN_SUM, UPDATE_TASK_ACTION } from '../../constants';
import { deleteTask, updateTask } from '../../store/taskReducer';
import { useState } from 'react';

type Props = {
  handleCancel: () => void;
  tasks: TTask[] | [];
  currentID?: string | undefined;
  setTasks?: ((tasks: TTask[] | []) => void) | undefined;
}

export const EditModal = ({ handleCancel, tasks, currentID, setTasks }: Props) => {
  const singleTask = tasks?.find((t: TTask) => t._id === currentID);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const [title, setTitle] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [sum, setSum] = useState<number>(0);

  const editTask = () => {
    updateTask(currentID ? currentID : '', {
      title, address, status, role, sum
    })
    .then(({ success, data }: TSuccessPromise) => {
      handleCancel();

      if (success) {
        const index = tasks.findIndex((t: TTask) => t._id === currentID);
        const tasksCopy = [...tasks];
        tasksCopy.splice(index, 1, data);

        dispatch({ type: UPDATE_TASK_ACTION, tasks: tasksCopy });
        setTasks && setTasks(tasksCopy);

        messageApi.open({
          type: 'success',
          content: 'Task successfully updated',
        });

      } else {
        messageApi.open({
          type: 'error',
          content: 'error',
        });
      }
    });
  }

  const deleteSingleTask = () => {
    deleteTask(currentID ? currentID : '').then(({ success, data }: TSuccessPromise) => {
      handleCancel();

      if (success) {
        dispatch({ type: DELETE_TASK_ACTION, tasks: tasks?.filter((t: TTask) => t._id !== data.data.task._id) });
        setTasks && setTasks(tasks ? tasks.filter((t: TTask) => t._id !== data.task._id) : []);

        messageApi.open({
          type: 'success',
          content: 'Task successfully deleted',
        });

      } else {
        messageApi.open({
          type: 'error',
          content: 'error',
        });
      }
    })
  }

  return (
    <div>
      {contextHolder}
      {
        singleTask && [singleTask].map((t: TTask) => (
          <div key={t._id} className={styles.singleTaskEdit}>

            <div className={styles.column}>
              <span>Title:</span>
              <Input
                value={title || t.title}
                onChange={(e: any) => {
                  setTitle(e.currentTarget.value)
                }}
              />
            </div>

            <div className={styles.column}>
              <span>Address:</span>
              <Input
                value={address || t.address}
                onChange={(e: any) => {
                  setAddress(e.currentTarget.value)
                }}
              />
            </div>

            <div className={styles.column}>
              <span>Status:</span>
              <Select
                value={status || t.status}
                onChange={(value: string) => {
                  setStatus(value)
                }}
              >
                <Select.Option value="open">Open</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="close">Close</Select.Option>
              </Select>
            </div>

            <div className={styles.column}>
              <span>Role:</span>
              <Select
                value={role || t.role}
                onChange={(value: string) => {
                  setRole(value)
                }}
              >
                <Select.Option value="customer">Customer</Select.Option>
                <Select.Option value="business">Business</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
            </div>

            <div className={styles.column}>
              <span>Sum:</span>
              <InputNumber
                type='number'
                min={MIN_SUM}
                max={MAX_SUM}
                value={sum || t.sum}
                onChange={(value: any) => {
                  setSum(Number(value))
                }}
              />
            </div>

          </div>
        ))
      }
      <div className={styles.createButtonGroup}>
        <Button
          className={styles.submit}
          onClick={editTask}
        >
          Save
        </Button>
        <Button
          className={styles.delete}
          onClick={deleteSingleTask}
        >
          Delete
        </Button>
        <Button
          onClick={() => handleCancel()}
        >
          Close
        </Button>
      </div>
    </div>
  );
}