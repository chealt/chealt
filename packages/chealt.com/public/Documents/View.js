import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';

import database from '../IndexedDB';
import { getDocument, isImage } from './utils';

import styles from './View.module.css';
import Link from '../Link';

const View = () => {
  const {
    params: { encodedDocumentKey }
  } = useRoute();
  const documentKey = atob(encodedDocumentKey);
  const [instance, setInstance] = useState();
  const [imageSource, setImageSource] = useState();

  useEffect(() => {
    (async () => {
      if (!instance) {
        setInstance(await database({ database: 'chealt' }));
      } else if (isImage(documentKey)) {
        const { blob } = await getDocument(instance)({ documentKey });

        const source = URL.createObjectURL(new Blob([blob]));

        setImageSource(source);
      } else {
        console.log(`Unsupported file: ${documentKey}`);
      }
    })();
  }, [instance, documentKey]);

  return (
    <div class={styles.view}>
      <Link href="/documents">Back to Documents</Link>
      {imageSource && <img src={imageSource} class={styles.image} />}
    </div>
  );
};

export default View;
