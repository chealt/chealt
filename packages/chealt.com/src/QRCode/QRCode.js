import { useEffect, useState, useRef } from 'preact/hooks';
import QRCodeStyling from 'qr-code-styling';

const QRCodeOptions = {
  width: 300,
  height: 300,
  type: 'svg'
};

const QRCode = ({ data }) => {
  const [options, setOptions] = useState({
    ...QRCodeOptions,
    data
  });
  const [qrCode] = useState(new QRCodeStyling(options));
  const ref = useRef(null);

  useEffect(() => {
    setOptions({
      ...QRCodeOptions,
      data
    });
  }, [data]);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) {
      return;
    }

    qrCode.update(options);
  }, [qrCode, options]);

  return <div ref={ref} />;
};

export default QRCode;
