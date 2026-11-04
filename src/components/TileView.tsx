import React from 'react';
import type { Sample, SampleFilterOptions } from '../types/sample';
import { FilterBar } from './FilterBar';
import { SampleCard } from './SampleCard';

interface TileViewProps {
  samples: Sample[];
  filters: SampleFilterOptions;
  onChangeFilter: <K extends keyof SampleFilterOptions>(key: K, value: SampleFilterOptions[K]) => void;
  onApplyServerFilter: () => void;
  onSelectSample: (sample: Sample) => void;
}

export const TileView: React.FC<TileViewProps> = ({
  samples,
  filters,
  onChangeFilter,
  onApplyServerFilter,
  onSelectSample
}) => {
  return (
    <div className="content-area grid-page">
      <FilterBar
        filters={filters}
        onChangeFilter={onChangeFilter}
        onApplyServerFilter={onApplyServerFilter}
      />

      <div className="cards-grid">
        {samples.length > 0 ? (
          samples.map((sample) => (
            <SampleCard
              key={sample.id}
              sample={sample}
              onSelectSample={onSelectSample}
            />
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};
