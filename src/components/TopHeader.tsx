import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';

interface TopHeaderProps {
  currentView: 'feed' | 'tile' | 'details';
  onOpenAbout: () => void;
  onBackToGrid: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ currentView, onOpenAbout, onBackToGrid }) => {
  return (
    <header
      className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom"
      style={{
        backgroundColor: 'var(--nav-bg)',
        borderColor: 'var(--border-color)',
        minHeight: '48px',
        zIndex: 10
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <span style={{ fontSize: '18px' }}>🧪</span>
        <span className="fw-bold" style={{ fontSize: '14px', color: 'var(--text-dark)' }}>
          Технические образцы
        </span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Badge
          style={{
            backgroundColor: 'var(--primary)',
            fontSize: '11px',
            borderRadius: 'var(--radius-global)'
          }}
        >
          Гость
        </Badge>
        {currentView === 'details' ? (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onBackToGrid}
            style={{ fontSize: '11px', borderRadius: 'var(--radius-global)' }}
          >
            Назад
          </Button>
        ) : (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onOpenAbout}
            style={{ fontSize: '11px', borderRadius: 'var(--radius-global)', color: 'var(--primary)', borderColor: 'var(--border-color)' }}
            title="Паспорт образца"
          >
            <InfoCircle size={13} className="me-1" />
            Паспорт
          </Button>
        )}
      </div>
    </header>
  );
};
