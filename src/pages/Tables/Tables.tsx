import React from "react";
import { useNavigate } from "react-router-dom";
import { useTables } from "./TablesContext";
import styles from './Tables.module.css';

export function Tables() {
  const navigate = useNavigate();
  const { tables } = useTables();

  const handleTableClick = (id: number) => {
    navigate(`/table/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selecciona una Mesa</h1>
      <div className={styles.grid}>
        {tables.map((table) => (
          <button
            key={table.id}
            className={`${styles.table} ${table.status === 1 ? styles.occupied : styles.free}`}
            onClick={() => handleTableClick(table.id)}
          >
            <div className={styles.tableContent}>
              <span>Mesa {table.id}</span>
              <span className={styles.status}>
                {table.status === 1 ? "Ocupada" : "Libre"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tables;
