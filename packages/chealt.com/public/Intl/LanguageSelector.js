import { useTranslation } from 'preact-i18next';

import Option from '../Form/Option';
import Select from '../Form/Select';

const LanguageSelector = () => {
  const { t } = useTranslation();

  const options = [
    { value: 'en-GB', label: t('en-GB') },
    { value: 'en-US', label: t('en-US') },
    { value: 'hu', label: t('hu') },
    { value: 'po', label: t('po') },
    { value: 'da', label: t('da') }
  ];

  return (
    <Select hideLabel>
      {options.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelector;
