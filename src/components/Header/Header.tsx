import React, { useState } from 'react';

import styles from './Header.module.css';
import { ModalComponent } from '../Modal/Modal';
import { modal_create_type } from '../../constants';

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.headerWrapper}>
        <p
          className={styles.button}
          onClick={ () => setIsModalOpen(!isModalOpen) }
        >Add new</p>
        <h1>Task manager</h1>
        <p>V - 1.0.1</p>
      </div>

      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type={modal_create_type}
      />
    </>
    
  )
}