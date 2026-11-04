import type { Sample } from '../types/sample';

export const MOCK_SAMPLES: Sample[] = [
  {
    id: 1,
    title: 'Известняк',
    description: 'Технический образец известняка для определения массовой доли примесей. При обработке кислотой выделяется углекислый газ.',
    status: 'published',
    impurities_percent: 15.5,
    gas_volume: 45,
    likes: 5,
    image_url: '/media/limestone.jpg',
    video_url: '/media/limestone.MP4',
    created_at: '2026-09-10T10:00:00Z',
    formation_date: '2026-09-12T14:30:00Z',
    creator_id: 1,
    isDraft: false
  },
  {
    id: 2,
    title: 'Мрамор',
    description: 'Кристаллическая горная порода, состоящая из кальцита. Используется в качестве образца для расчета доли примесей.',
    status: 'published',
    impurities_percent: 2.3,
    gas_volume: 85,
    likes: 3,
    image_url: '/media/marble.jpg',
    video_url: '/media/marble.MP4',
    created_at: '2026-09-15T11:20:00Z',
    formation_date: '2026-09-16T12:00:00Z',
    creator_id: 1,
    isDraft: false
  },
  {
    id: 3,
    title: 'Металлический цинк',
    description: 'Образец цинка с примесями. При реакции с соляной кислотой выделяется водород.',
    status: 'published',
    impurities_percent: 5.0,
    gas_volume: 22,
    likes: 2,
    image_url: '/media/zinc.jpg',
    video_url: '/media/zinc.MP4',
    created_at: '2026-09-18T09:15:00Z',
    formation_date: '2026-09-19T10:00:00Z',
    creator_id: 2,
    isDraft: false
  },
  {
    id: 4,
    title: 'Новый образец',
    description: 'Описание нового образца',
    status: 'draft',
    impurities_percent: 0,
    gas_volume: 0,
    likes: 0,
    image_url: '',
    video_url: '',
    created_at: '2026-10-01T08:30:00Z',
    formation_date: null,
    creator_id: 1,
    isDraft: true
  }
];
