import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';

import database from '../IndexedDB';
import { getDocument, isImage, isPDF } from './utils';

import styles from './View.module.css';
import Link from '../Link';

const View = () => {
  const {
    params: { encodedDocumentKey }
  } = useRoute();
  const documentKey = atob(encodedDocumentKey);
  const [instance, setInstance] = useState();
  const [imageSource, setImageSource] = useState();
  const [openedInNewTab, setOpenedInNewTab] = useState(false);

  useEffect(() => {
    (async () => {
      if (!instance) {
        setInstance(await database({ database: 'chealt' }));
      } else {
        const { blob } = await getDocument(instance)({ documentKey });

        if (isImage(documentKey)) {
          const objectURL = URL.createObjectURL(new Blob([blob]));

          setImageSource(objectURL);
        } else if (isPDF(documentKey)) {
          const objectURL = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

          window.open(objectURL);
          setOpenedInNewTab(true);
        } else {
          // eslint-disable-next-line no-console
          console.log('Unsupported file extension.');
        }
      }
    })();
  }, [instance, documentKey]);

  return (
    <div class={styles.view}>
      <Link href="/documents">Back to Documents</Link>
      {imageSource && <img src={imageSource} class={styles.image} />}
      {openedInNewTab && (
        <>
          <p>
            The document is opened in a new tab. If you cannot see it, it is unsupported or it might have been blocked
            by an ad blocker. Supported image extensions: JPG, JPEG, BMP, PNG, other extensions: PDF.
          </p>
        </>
      )}
    </div>
  );
};

export default View;
