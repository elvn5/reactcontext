import styles from '../../styles/promotions/arrows.module.scss';

export const PrevArrow = ({ onClick }) => {
  return <button className={styles.prev} onClick={onClick}></button>
}

export const NextArrow = ({ onClick }) => {
  return <button className={styles.next} onClick={onClick}></button>
}