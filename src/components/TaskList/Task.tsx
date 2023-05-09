import { useState } from 'react';

import { TTask } from '../../types/index.type';
import styles from './TaskList.module.css';
import { ModalComponent } from '../Modal/Modal';
import { modal_edit_type } from '../../constants';

type Props = {
  tasks: TTask[] | [];
  setTasks: (tasks: TTask[] | []) => void;
}

export const Task = ({ tasks, setTasks }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentID, setCurrentID] = useState<string | undefined>('');

  return (
    <>
      <ModalComponent
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        type={modal_edit_type}
        currentID={currentID}
        setTasks={setTasks}
      />
      {
        tasks?.map((t: TTask) => (
          <div key={t._id} className={styles.singleTask}>
            <button
              className={styles.editTask}
              onClick={() => {
                setIsOpen(!isOpen);
                setCurrentID(t._id);
              }}
            >
              Edit
            </button>

            <div className={styles.column}>
              <span>Title:</span>
              <h3>{t.title}</h3>
            </div>

            <div className={styles.column}>
              <span>Address:</span>
              <p>{t.address}</p>
            </div>

            <div className={styles.column}>
              <span>Status:</span>
              <p>{t.status}</p>
            </div>

            <div className={styles.column}>
              <span>Role:</span>
              <p>{t.role}</p>
            </div>

            <div className={styles.column}>
              <span>Sum:</span>
              <p>{t.sum}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}