import type { Sample } from '../types/sample';
import { MOCK_SAMPLES } from '../mock/mockSamples';

export async function fetchSamples(gasVolume?: number): Promise<Sample[]> {
  const url = gasVolume !== undefined && !isNaN(gasVolume)
    ? `/api/samples?gas_volume=${gasVolume}`
    : '/api/samples';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data: Sample[] = await response.json();
    return data.map((item) => ({
      ...item,
      isDraft: item.status === 'draft'
    }));
  } catch (err) {
    console.warn('Network fetch failed, falling back to local mock data', err);
    let items = MOCK_SAMPLES.filter((s) => s.status !== 'deleted');
    if (gasVolume !== undefined && !isNaN(gasVolume)) {
      items = items.filter((s) => s.gas_volume === gasVolume);
    }
    return items;
  }
}

export async function fetchFeedSample(id?: number, next: boolean = false): Promise<Sample | null> {
  const params = new URLSearchParams();
  if (id !== undefined) params.set('id', String(id));
  if (next) params.set('next', 'true');

  const url = `/api/samples/feed?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn('Network fetch failed, fallback to local feed', err);
    const published = MOCK_SAMPLES.filter((s) => s.status !== 'deleted');
    let idx = 0;
    if (id !== undefined) {
      const foundIdx = published.findIndex((s) => s.id === id);
      if (foundIdx !== -1) idx = foundIdx;
    }
    if (next) {
      idx = (idx + 1) % published.length;
    }
    return published[idx] || null;
  }
}
