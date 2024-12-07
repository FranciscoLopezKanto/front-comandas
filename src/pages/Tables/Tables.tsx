import { useNavigate } from 'react-router-dom';
import styles from './Tables.module.css';

export function Tables() {
  const navigate = useNavigate();

  // Define las mesas con su estado (abierta o libre)
  const tables = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    status: i === 1 || i === 4 ? 'open' : 'free', // Mesas 2 y 5 están abiertas
  }));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selecciona una Mesa</h1>
      <div className={styles.grid}>
        {tables.map((table) => (
          <button
            key={table.id}
            className={`${styles.table} ${
              table.status === 'open' ? styles.open : styles.free
            }`}
            onClick={() => navigate(`/table/${table.id}`)}
          >
            <div className={styles.tableContent}>
              <span>Mesa {table.id}</span>
              {table.status === 'open' && (
                <span className={styles.status}>Activa</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
