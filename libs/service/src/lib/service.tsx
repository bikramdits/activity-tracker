import styles from './service.module.scss';

/* eslint-disable-next-line */
export interface ServiceProps {}

export function Service(props: ServiceProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Service!</h1>
    </div>
  );
}

export default Service;
