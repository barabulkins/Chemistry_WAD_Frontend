import React from 'react';
import type { Sample } from '../types/sample';
import { DEFAULT_IMAGE } from '../constants/assets';

interface SampleCardProps {
  sample: Sample;
  onSelectSample: (sample: Sample) => void;
}

export const SampleCard: React.FC<SampleCardProps> = ({ sample, onSelectSample }) => {
  const imageSrc = sample.image_url && sample.image_url.trim() !== ''
    ? sample.image_url
    : DEFAULT_IMAGE;

  return (
    <a
      href={`#feed-${sample.id}`}
      className="card"
      onClick={(e) => {
        e.preventDefault();
        onSelectSample(sample);
      }}
    >
      <div className="card-img-container">
        <img
          src={imageSrc}
          alt={sample.title}
          className="card-img"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
        {sample.isDraft && (
          <div className="draft-badge">Черновик</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-title">{sample.title}</h3>
        <div className="card-likes">
          <span>❤️</span> {sample.likes}
        </div>
      </div>
    </a>
  );
};
