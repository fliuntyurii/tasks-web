import { Modal } from 'antd';
import { useSelector } from 'react-redux';

import { modal_create_type, modal_edit_type } from '../../constants';
import { CreateForm } from './CreateForm';
import { EditModal } from './EditForm';
import { RootState } from '../../store/store';
import { TTask } from '../../types/index.type';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  type: string;
  currentID?: string | undefined;
  setTasks?: ((tasks: TTask[] | []) => void) | undefined;
}

export const ModalComponent = ({ isModalOpen, setIsModalOpen, type, currentID, setTasks }: Props) => {
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={type}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        {
          type === modal_create_type &&
          <CreateForm 
            handleOk={handleOk}
            handleCancel={handleCancel}
            setTasks={setTasks}
          />
        }

        {
          type === modal_edit_type && 
          <EditModal
            tasks={tasks}
            handleCancel={handleCancel}
            currentID={currentID}
            setTasks={setTasks}
          />
        }
      </Modal>
    </>
  );
};