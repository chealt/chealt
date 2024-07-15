import { useEffect, useState } from 'preact/hooks';

import { isPDF } from './utils';
import Button from '../Form/Button';
import Download from '../Icons/Download';
import { useObjectStore } from '../IndexedDB/hooks';

const DownloadButton = ({ documentKey }) => {
  const [document, setDocument] = useState();
  const { getItem } = useObjectStore('documents');

  useEffect(() => {
    (async () => {
      const item = await getItem(documentKey);

      // Check if getItem returns anything
      // If the instance is not yet initialized this will be falsy
      if (item) {
        setDocument({
          ...item,
          blobUrl: isPDF(item.name)
            ? URL.createObjectURL(new Blob([item.blob]), { type: 'application/pdf' })
            : URL.createObjectURL(new Blob([item.blob]))
        });
      }
    })();
  }, [getItem, documentKey]);

  return (
    <>
      {document?.blobUrl && (
        <Button
          href={document.blobUrl}
          download={document.name}
          target="_blank"
          ghost
          isLink /* needs to be a link for the download to work */
        >
          <Download />
        </Button>
      )}
    </>
  );
};

export default DownloadButton;
