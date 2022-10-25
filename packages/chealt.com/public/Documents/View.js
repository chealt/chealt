import { useRoute } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';

import { useObjectStore } from '../IndexedDB/hooks';
import Link from '../Link/Link';
import { isImage, isPDF } from './utils';

import styles from './View.module.css';

const View = () => {
  const {
    params: { encodedDocumentKey }
  } = useRoute();
  const documentKey = atob(encodedDocumentKey);
  const [imageSource, setImageSource] = useState();
  const [openedInNewTab, setOpenedInNewTab] = useState(false);
  const { getItem } = useObjectStore('documents');

  useEffect(() => {
    (async () => {
      const item = await getItem(documentKey);

      // Check if getItem returns anything
      // If the instance is not yet initialized this will be falsy
      if (item) {
        const { blob, name } = item;

        if (isImage(name)) {
          const objectURL = URL.createObjectURL(new Blob([blob]));

          setImageSource(objectURL);
        } else if (isPDF(name)) {
          const objectURL = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

          window.open(objectURL);
          setOpenedInNewTab(true);
        } else {
          // eslint-disable-next-line no-console
          console.log('Unsupported file extension.');
        }
      }
    })();
  }, [getItem, documentKey]);

  return (
    <div class={styles.view}>
      <Link href="/documents">Back to Documents</Link>
      {imageSource && <img src={imageSource} class={styles.image} />}
      {openedInNewTab && (
        <>
          <p>
            The document is opened in a new tab. If you cannot see it, it is unsupported or it might
            have been blocked by an ad blocker. Supported image extensions: JPG, JPEG, BMP, PNG,
            other extensions: PDF.
          </p>
        </>
      )}
    </div>
  );
};

export default View;
