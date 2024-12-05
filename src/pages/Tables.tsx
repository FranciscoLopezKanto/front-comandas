import { useNavigate } from 'react-router-dom';
import styles from './Tables.module.css';

export function Tables() {
  const navigate = useNavigate();

  const tables = Array.from({ length: 9 }, (_, i) => i + 1); // Generar mesas 1-10

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selecciona una Mesa</h1>
      <div className={styles.grid}>
        {tables.map((table) => (
          <button
            key={table}
            className={styles.table}
            onClick={() => navigate(`/table/${table}`)}
          >
            Mesa {table}
          </button>
        ))}
      </div>
    </div>
  );
}
