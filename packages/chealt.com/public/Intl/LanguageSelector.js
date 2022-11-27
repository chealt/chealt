import { useTranslation } from 'preact-i18next';
import { useContext } from 'preact/hooks';

import { AppState } from '../App/state';
import Option from '../Form/Option';
import Select from '../Form/Select';
import { setSelectedLanguage } from './signals';

const sortByProp = (toSortBy) => (a, b) => a[toSortBy].localeCompare(b[toSortBy]);

const LanguageSelector = () => {
  const {
    intl: { selectedLanguage }
  } = useContext(AppState);
  const { t } = useTranslation();

  const options = [
    { value: 'en-GB', label: t('languages.en-GB') },
    { value: 'en-US', label: t('languages.en-US') },
    { value: 'hu', label: t('languages.hu') },
    { value: 'po', label: t('languages.po') },
    { value: 'da', label: t('languages.da') }
  ];

  return (
    <Select hideLabel inline onChange={({ target: { value } }) => setSelectedLanguage(value)}>
      {options.sort(sortByProp('label')).map(({ value, label }) => (
        <Option key={value} value={value} selected={value === selectedLanguage.value}>
          {label}
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelector;
