import React from "react";
import styles from "./styles.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onAdd?: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, onAdd, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1>{title}</h1>
        {children}
        <div className={styles.modalButtons}>
        {onAdd && (
            <button className={styles.addTaskButton} onClick={onAdd}>
              Adicionar
            </button>
          )}
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          
        </div>
      </div>
    </div>
  );
};
