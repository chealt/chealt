import classnames from 'classnames';

import styles from './ProfilePicture.module.css';

const ProfilePicture = ({ blob, src, name, highlighted }) => (
  <div
    class={classnames({
      [styles.container]: true,
      [styles.highlighted]: highlighted
    })}
  >
    {(blob || src) && (
      <img
        class={styles.image}
        src={src ? src : URL.createObjectURL(new Blob([blob]))}
        alt={name}
        referrerpolicy="no-referrer"
      />
    )}
    {name?.slice(0, 2) || 'An'}
  </div>
);

export default ProfilePicture;
