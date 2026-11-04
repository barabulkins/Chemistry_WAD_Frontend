import React from 'react';
import type { SampleFilterOptions } from '../types/sample';

interface FilterBarProps {
  filters: SampleFilterOptions;
  onChangeFilter: <K extends keyof SampleFilterOptions>(key: K, value: SampleFilterOptions[K]) => void;
  onApplyServerFilter: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChangeFilter,
  onApplyServerFilter
}) => {
  return (
    <form
      className="search-bar"
      style={{ flexDirection: 'column' }}
      onSubmit={(e) => {
        e.preventDefault();
        onApplyServerFilter();
      }}
    >
      <label id="gas_volume_label" htmlFor="gas_volume" style={{ fontSize: '14px', fontWeight: 600 }}>
        Объем газа (мл из 1 кг), текущий: {filters.gasVolumeMin ? filters.gasVolumeMin : 'не задан'}
      </label>
      <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
        <input
          type="range"
          name="gas_volume"
          id="gas_volume"
          className="form-control"
          style={{ flex: 1 }}
          value={filters.gasVolumeMin ?? 0}
          min="0"
          max="100"
          step="1"
          onChange={(e) => onChangeFilter('gasVolumeMin', Number(e.target.value))}
        />
        <button type="submit" className="search-btn">
          Найти
        </button>
      </div>
    </form>
  );
};
