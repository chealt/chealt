import { useContext } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { setSelectedLanguage } from './signals';
import { AppState } from '../App/state';
import Option from '../Form/Option';
import Select from '../Form/Select';

const sortByProp = (toSortBy) => (a, b) => a[toSortBy].localeCompare(b[toSortBy]);

const LanguageSelector = ({ language: languageProp, onChange, profileId }) => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    if (profileId === selectedProfileId.value) {
      setSelectedLanguage(language);
      i18n.changeLanguage(language);
    }

    onChange(language);
  };

  const options = [
    { value: 'en-GB', label: t('languages.en-GB') },
    { value: 'en-US', label: t('languages.en-US') },
    { value: 'hu', label: t('languages.hu') },
    { value: 'po', label: t('languages.po') },
    { value: 'da', label: t('languages.da') }
  ];

  return (
    <Select
      label={t('common.language')}
      onChange={({ target: { value } }) => changeLanguage(value)}
    >
      {options.sort(sortByProp('label')).map(({ value, label }) => (
        <Option key={value} value={value} selected={value === languageProp}>
          {label}
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelector;
