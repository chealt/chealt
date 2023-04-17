import { useEffect, useState } from 'preact/hooks';

import { isPDF } from './utils';
import Download from '../Icons/Download';
import { useObjectStore } from '../IndexedDB/hooks';
import Link from '../Link/Link';

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
        <Link href={document.blobUrl} download={document.name} target="_blank" buttonStyled ghost>
          <Download />
        </Link>
      )}
    </>
  );
};

export default DownloadButton;
