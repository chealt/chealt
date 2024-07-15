import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';
import { useRoute } from 'preact-iso';

import { isImage, isPDF } from './utils';
import { useObjectStore } from '../IndexedDB/hooks';
import Link from '../Link/Link';

import styles from './View.module.css';

const View = () => {
  const { t } = useTranslation();
  const {
    params: { encodedDocumentKey, refererPage }
  } = useRoute();
  const documentKey = atob(encodedDocumentKey);
  const [imageSource, setImageSource] = useState();
  const [openedInNewTab, setOpenedInNewTab] = useState(false);
  const { getItem } = useObjectStore('documents');

  useEffect(() => {
    (async () => {
      if (documentKey) {
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
      }
    })();
  }, [getItem, documentKey]);

  return (
    <div class={styles.view}>
      <Link href={`/${refererPage}`}>{t('common.back')}</Link>
      {imageSource && <img src={imageSource} class={styles.image} />}
      {openedInNewTab && <p>{t('pages.documents.openInNewTab')}</p>}
    </div>
  );
};

export default View;
