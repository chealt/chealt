import styles from './Avatar.module.css';

const Avatar = ({ blob, name }) => (
  <div class={styles.avatar}>
    {blob && <img class={styles.image} src={URL.createObjectURL(new Blob([blob]))} alt={name} />}
    {name?.slice(0, 2) || 'An'}
  </div>
);

export default Avatar;
