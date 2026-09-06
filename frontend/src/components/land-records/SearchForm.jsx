import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { statesData } from '../../data/states';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import { Search, RotateCcw, MapPin, Hash } from 'lucide-react';

export const SearchForm = ({ onSearch, onReset }) => {
  const { t } = useLanguage();
  const [searchMode, setSearchMode] = useState('location');

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTehsil, setSelectedTehsil] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const [recordType, setRecordType] = useState('khasra');
  const [recordNumber, setRecordNumber] = useState('');

  const currentStateObj = statesData.find(s => s.state === selectedState);
  const districtOptions = currentStateObj 
    ? currentStateObj.districts.map(d => ({ value: d.name, label: d.name }))
    : [];

  const currentDistrictObj = currentStateObj?.districts.find(d => d.name === selectedDistrict);
  const tehsilOptions = currentDistrictObj 
    ? currentDistrictObj.tehsils.map(t => ({ value: t.name, label: t.name }))
    : [];

  const currentTehsilObj = currentDistrictObj?.tehsils.find(t => t.name === selectedTehsil);
  const villageOptions = currentTehsilObj 
    ? currentTehsilObj.villages.map(v => ({ value: v, label: v }))
    : [];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict('');
    setSelectedTehsil('');
    setSelectedVillage('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedTehsil('');
    setSelectedVillage('');
  };

  const handleTehsilChange = (e) => {
    setSelectedTehsil(e.target.value);
    setSelectedVillage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      if (searchMode === 'location') {
        onSearch({ state: selectedState, district: selectedDistrict, tehsil: selectedTehsil, village: selectedVillage });
      } else {
        onSearch({ type: recordType, query: recordNumber });
      }
    }
  };

  const handleReset = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTehsil('');
    setSelectedVillage('');
    setRecordNumber('');
    if (onReset) onReset();
  };

  return (
    <div className="search-form-container-card">
      <div className="search-tabs-row">
        <button
          type="button"
          className={`search-tab-btn ${searchMode === 'location' ? 'active' : ''}`}
          onClick={() => setSearchMode('location')}
        >
          <MapPin size={16} />
          <span>{t('tabLocation')}</span>
        </button>
        <button
          type="button"
          className={`search-tab-btn ${searchMode === 'record' ? 'active' : ''}`}
          onClick={() => setSearchMode('record')}
        >
          <Hash size={16} />
          <span>{t('tabRecord')}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="search-form-body">
        {searchMode === 'location' ? (
          <div className="search-fields-grid-4">
            <Select
              label={t('labelState')}
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              placeholder={t('selectState')}
              options={statesData.map(s => ({ value: s.state, label: s.state }))}
              required
            />
            <Select
              label={t('labelDistrict')}
              name="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              placeholder={t('selectDistrict')}
              options={districtOptions}
              disabled={!selectedState}
              required
            />
            <Select
              label={t('labelTehsil')}
              name="tehsil"
              value={selectedTehsil}
              onChange={handleTehsilChange}
              placeholder={t('selectTehsil')}
              options={tehsilOptions}
              disabled={!selectedDistrict}
              required
            />
            <Select
              label={t('labelVillage')}
              name="village"
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              placeholder={t('selectVillage')}
              options={villageOptions}
              disabled={!selectedTehsil}
            />
          </div>
        ) : (
          <div className="search-fields-grid-2">
            <Select
              label={t('searchByLabel')}
              name="recordType"
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              options={[
                { value: 'khasra', label: t('khasraNumber') },
                { value: 'khata', label: t('khataNumber') },
                { value: 'owner', label: t('ownerName') },
                { value: 'ulpin', label: t('ulpinAadhaar') }
              ]}
            />
            <Input
              label={t('enterIdentifierValue')}
              name="recordNumber"
              value={recordNumber}
              onChange={(e) => setRecordNumber(e.target.value)}
              placeholder="e.g. 45/2 or Ram Kumar"
              required
            />
          </div>
        )}

        <div className="search-form-actions">
          <Button type="submit" variant="primary" icon={Search}>
            {t('btnSearchLandRecord')}
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} icon={RotateCcw}>
            {t('btnReset')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;