import React, { useState, useEffect, useCallback } from 'react';
import type { Sample, SampleFilterOptions } from './types/sample';
import { fetchSamples, fetchFeedSample } from './services/sampleService';
import { BottomNav } from './components/BottomNav';
import { TileView } from './components/TileView';
import { FeedView } from './components/FeedView';
import { SampleDetailView } from './components/SampleDetailView';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'feed' | 'tile' | 'details'>('tile');
  const [samples, setSamples] = useState<Sample[]>([]);
  const [feedSample, setFeedSample] = useState<Sample | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  const [filters, setFilters] = useState<SampleFilterOptions>({
    searchQuery: '',
    gasVolumeMin: 0
  });

  useEffect(() => {
    loadCatalog();
  }, []);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadCatalog = useCallback(async (volume?: number) => {
    const data = await fetchSamples(volume);
    setSamples(data);
  }, []);

  const loadFeed = useCallback(async (id?: number, next: boolean = false) => {
    const data = await fetchFeedSample(id, next);
    setFeedSample(data);
  }, []);

  const handleApplyServerFilter = useCallback(() => {
    loadCatalog(filters.gasVolumeMin);
  }, [loadCatalog, filters.gasVolumeMin]);

  const handleChangeFilter = useCallback(<K extends keyof SampleFilterOptions>(key: K, value: SampleFilterOptions[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="app-container">
      {currentView === 'tile' && (
        <TileView
          samples={samples}
          filters={filters}
          onChangeFilter={handleChangeFilter}
          onApplyServerFilter={handleApplyServerFilter}
          onSelectSample={(sample) => {
            setSelectedSample(sample);
            loadFeed(sample.id, false);
            setCurrentView('feed');
          }}
        />
      )}

      {currentView === 'feed' && (
        <FeedView
          sample={feedSample}
          onNextSample={() => loadFeed(feedSample?.id, true)}
        />
      )}

      {currentView === 'details' && selectedSample && (
        <SampleDetailView
          sample={selectedSample}
          onWatchInFeed={(id) => {
            loadFeed(id, false);
            setCurrentView('feed');
          }}
        />
      )}

      <BottomNav
        activeTab={currentView === 'feed' ? 'feed' : 'tile'}
        onSelectTab={(tab) => setCurrentView(tab)}
      />
    </div>
  );
};

export default App;
