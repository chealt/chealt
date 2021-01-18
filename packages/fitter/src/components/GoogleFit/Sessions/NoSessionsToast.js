import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { Context } from '../../context';
import { formatDate } from '../../../utils/dateTime';

const NoSessionsToast = ({ startTimeMillis }) => {
  const { dateFormat } = useContext(Context);

  return (
    <>
      No new sessions in the month before {formatDate(dateFormat, startTimeMillis)}.
      Try loading more!
    </>
  );
};

export default NoSessionsToast;
