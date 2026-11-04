export interface Sample {
  id: number;
  title: string;
  description: string;
  status: 'published' | 'draft' | 'deleted';
  impurities_percent: number;
  gas_volume: number;
  likes: number; // likes count
  image_url: string;
  video_url: string;
  created_at: string;
  formation_date: string | null;
  creator_id: number;
  isDraft?: boolean;
}

export interface SampleFilterOptions {
  searchQuery: string;
  gasVolumeMin?: number;
  gasVolumeMax?: number;
  impuritiesMax?: number;
  status?: string;
  sortBy?: 'id' | 'title' | 'gas_volume' | 'impurities_percent' | 'likes';
  sortOrder?: 'asc' | 'desc';
}
