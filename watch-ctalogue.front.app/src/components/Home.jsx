import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1>Welcome to the Watch Store</h1>
        <p>Explore our collection or add a new product to the catalogue.</p>

        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={() => navigate('/add-product')}>
            Add a product
          </button>
          <button type="button" className={styles.button} onClick={() => navigate('/view-products')}>
            View all products
          </button>
        </div>
      </div>
    </main>
  );
}
