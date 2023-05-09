import { Button, Input, Select } from 'antd';
import { useCallback, useState } from 'react';

import styles from './Filter.module.css';
import { TFilters, TTask } from '../../types/index.type';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type Props = {
  setTasks: (value: TTask[] | []) => void;
}

export const Filter = ({ setTasks }: Props) => {
  const [filterProps, setFilterProps] = useState<TFilters>({
    title: '', status: '', role: ''
  });

  const tasks = useSelector((state: RootState) => state.task.tasks);

  const filterTasksByProps = useCallback((tasks: TTask[], title: string, status: string, role: string) => {
    const filteredTasks = tasks && tasks.filter((t: TTask) => {
      console.log('do')
      if (title && t.title.toLowerCase().indexOf(title.toLowerCase()) === -1) {
        return false;
      }
      if (status && t.status !== status) {
        return false;
      }
      if (role && t.role !== role) {
        return false;
      }
      return true;
    });

    setTasks(filteredTasks);
  }, [setTasks]);

  return (
    <div className={styles.filterWrapper}>
      <h2>Filter by:</h2>

      <Input
        placeholder="Title"
        onChange={(e: any) => {
          setFilterProps({ ...filterProps, title: e.currentTarget.value })
        }}
      />

      <Select
        placeholder="Status"
        optionFilterProp="children"
        onChange={(value: string) => {
          setFilterProps({ ...filterProps, status: value })
        }}
        options={[
          {
            value: 'open',
            label: 'Open',
          },
          {
            value: 'pending',
            label: 'Pending',
          },
          {
            value: 'close',
            label: 'Close',
          },
        ]}
      />

      <Select
        placeholder="Role"
        optionFilterProp="children"
        onChange={(value: string) => {
          setFilterProps({ ...filterProps, role: value })
        }}
        options={[
          {
            value: 'customer',
            label: 'Customer',
          },
          {
            value: 'business',
            label: 'Business',
          },
          {
            value: 'admin',
            label: 'Admin',
          },
        ]}
      />
      
      <Button
        onClick={() => filterTasksByProps(tasks, filterProps.title, filterProps.status, filterProps.role)}
      >
        Filter
      </Button>
    </div>
  );
} 