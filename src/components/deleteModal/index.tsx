import React from "react";
import styles from "./styles.module.scss";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1 className={styles.Deletetitle}>Deletar tarefa</h1>
        <p className={styles.DeleteSubtitle}>Tem certeza que você deseja deletar essa tarefa?</p>
        <div className={styles.modalButtons}>
        <button className={styles.deleteButton} onClick={onDelete}>
            Apagar
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
