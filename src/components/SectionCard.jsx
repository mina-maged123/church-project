import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Card = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 210px;
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  border: 1px solid rgba(201, 168, 76, 0.5);
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.96), rgba(240, 228, 201, 0.72));
  box-shadow: var(--shadow-warm);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.5), transparent 36%);
    pointer-events: none;
  }
`;

export function SectionCard({ section, levelId, delay = 0 }) {
  return (
    <Card
      to={`/level/${levelId}/section/${section.id}`}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(201,168,76,0.3)' }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: 999,
            padding: '0.4rem 0.75rem',
            background: section.accent,
            color: 'white',
            fontSize: '0.88rem',
            fontWeight: 700,
          }}
        >
          {section.title}
        </div>
        <p style={{ marginTop: '1rem', lineHeight: 1.8, color: 'rgba(26, 18, 8, 0.84)' }}>{section.description}</p>
      </div>
      <div
        style={{
          marginTop: '1.25rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--dark-ink)',
          fontWeight: 700,
        }}
      >
        ابدأ الدروس
        <ArrowRight size={16} />
      </div>
    </Card>
  );
}
