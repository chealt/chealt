import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';

import database from '../IndexedDB';
import { getDocument } from './utils';

import styles from './View.module.css';
import Link from '../Link';

const View = () => {
  const {
    params: { documentKey }
  } = useRoute();
  const [instance, setInstance] = useState();
  const [imageSource, setImageSource] = useState();

  useEffect(() => {
    (async () => {
      if (!instance) {
        setInstance(await database({ database: 'chealt' }));
      } else {
        const { blob } = await getDocument(instance)({ documentKey });

        const source = URL.createObjectURL(new Blob([blob]));

        setImageSource(source);
      }
    })();
  }, [instance, documentKey]);

  return (
    <>
      <Link href="/documents">Back to Documents</Link>
      {imageSource && <img src={imageSource} class={styles.image} />}
    </>
  );
};

export default View;
