import styles from './ProfilePicture.module.css';

const ProfilePicture = ({ blob, name }) => (
  <div class={styles.container}>
    {blob && <img class={styles.image} src={URL.createObjectURL(new Blob([blob]))} alt={name} />}
    {name?.slice(0, 2) || 'An'}
  </div>
);

export default ProfilePicture;
