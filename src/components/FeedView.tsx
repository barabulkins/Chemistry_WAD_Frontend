import React from 'react';
import type { Sample } from '../types/sample';
import { DEFAULT_IMAGE, DEFAULT_VIDEO } from '../constants/assets';

interface FeedViewProps {
  sample: Sample | null;
  onNextSample: () => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ sample, onNextSample }) => {
  if (!sample) {
    return (
      <div className="content-area feed-container">
        <div style={{ padding: '20px', color: 'white' }}>Нет доступных образцов</div>
      </div>
    );
  }

  const videoSrc = sample.video_url && sample.video_url.trim() !== ''
    ? sample.video_url
    : DEFAULT_VIDEO;

  const posterSrc = sample.image_url && sample.image_url.trim() !== ''
    ? sample.image_url
    : DEFAULT_IMAGE;

  return (
    <div className="content-area feed-container">
      <video
        key={sample.id}
        className="feed-video"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
      />

      {/* Нижняя инфо-панель (поверх видео) */}
      <div className="feed-overlay">
        {/* Описание */}
        <div className="feed-desc-row" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <span
            className="feed-desc-text"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {sample.title} 🔥 {sample.description}
          </span>
          <span className="feed-desc-more" style={{ whiteSpace: 'nowrap', marginLeft: '5px' }}>
            Еще
          </span>
        </div>
      </div>

      {/* Правый столбец кнопок и параметров */}
      <div className="feed-actions">
        {/* Параметры по теме */}
        <div className="action-btn" title="Примеси (%, в 1 кг образца)">
          <svg className="icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <span className="count">{sample.impurities_percent}%</span>
        </div>
        <div className="action-btn" title="Объем газа (мл из 1 кг)">
          <svg className="icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="count">{sample.gas_volume} мл</span>
        </div>

        {/* Иконка лайка */}
        <div className="action-btn">
          <svg className="icon" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="count">{sample.likes}</span>
        </div>

        {/* Кнопка следующий образец */}
        <button
          type="button"
          onClick={onNextSample}
          className="next-btn"
          title="Следующий образец"
          style={{ cursor: 'pointer' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
