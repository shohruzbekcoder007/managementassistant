import { Link } from 'react-router-dom';
import styles from './Unauthorized.module.scss';

export const Unauthorized = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>🚫</div>
        <h1 className={styles.title}>Kirish taqiqlangan</h1>
        <p className={styles.message}>
          Sizda bu sahifaga kirish huquqi yo'q. Agar bu xato deb hisoblasangiz, administrator bilan bog'laning.
        </p>
        <div className={styles.actions}>
          <Link to="/dashboard" className={styles.homeLink}>
            Asosiy sahifaga qaytish
          </Link>
          <Link to="/login" className={styles.loginLink}>
            Qayta kirish
          </Link>
        </div>
      </div>
    </div>
  );
};
