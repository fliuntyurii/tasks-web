import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message
} from 'antd';
import { useDispatch, useSelector } from "react-redux";

import styles from './Modal.module.css';
import { CREATE_TASK_ACTION, MAX_SUM, MIN_SUM } from '../../constants';
import { createTask } from '../../store/taskReducer';
import { TSuccessPromise, TTask } from '../../types/index.type';
import { RootState } from '../../store/store';

type Props = {
  handleOk: () => void;
  handleCancel: () => void;
  setTasks?: (tasks: TTask[] | []) => void;
}

export const CreateForm = ({
  handleOk,
  handleCancel,
  setTasks,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const validateMessages = {
    required: 'Field is required!'
  };

  const onFinish = async (values: any) => {
    await createTask(values.task).then(({ success, data }: TSuccessPromise) => {
      if (success) {
        dispatch({ type: CREATE_TASK_ACTION, task: data });
        console.log(tasks, data)
        setTasks && setTasks([...tasks, data]);

        messageApi.open({
          type: 'success',
          content: 'Task successfully created',
        });

      } else {
        messageApi.open({
          type: 'error',
          content: 'error',
        });
      }
    });

    handleOk();
    form.resetFields();
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600, marginTop: 30 }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      {contextHolder}
      <Form.Item name={['task', 'title']} rules={[{ required: true }]} label="Title">
        <Input
          minLength={4}
          maxLength={24}
        />
      </Form.Item>

      <Form.Item name={['task', 'address']} rules={[{ required: true }]} label="Address">
        <Input
          minLength={6}
          maxLength={20}
        />
      </Form.Item>

      <Form.Item name={['task', 'status']} label="Status">
        <Select defaultValue="open">
          <Select.Option value="open">Open</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="close">Close</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name={['task', 'role']} label="Role">
        <Select defaultValue="customer">
          <Select.Option value="customer">Customer</Select.Option>
          <Select.Option value="business">Business</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name={['task', 'sum']} label="Sum">
        <InputNumber
          defaultValue={1}
          min={MIN_SUM}
          max={MAX_SUM}
          type='number'
        />
      </Form.Item>

      <div className={styles.createButtonGroup}>
        <Form.Item>
          <Button className={styles.submit} htmlType="submit">Create</Button>
        </Form.Item>

        <Form.Item>
          <Button onClick={() => handleCancel()}>Close</Button>
        </Form.Item>
      </div>
    </Form>
  )
}
