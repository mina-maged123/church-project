import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Cross } from 'lucide-react';
import { Link } from 'react-router-dom';

const Card = styled(motion(Link))`
  position: relative;
  display: block;
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.98), rgba(232, 213, 163, 0.4));
  border: 1px solid rgba(201, 168, 76, 0.68);
  box-shadow: var(--shadow-warm);
  min-height: 190px;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 10px;
    border: 1px solid rgba(139, 26, 26, 0.14);
    pointer-events: none;
  }

  &::after {
    inset: 18px;
    border-color: rgba(27, 58, 107, 0.12);
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  color: var(--gold);
  background: rgba(27, 58, 107, 0.08);
  font-size: 0.85rem;
  font-weight: 700;
`;

export function LevelCard({ level, delay = 0 }) {
  return (
    <Card
      to={`/level/${level.id}`}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(201,168,76,0.3)' }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Badge>
        <Cross size={16} />
        <span>{level.subtitle}</span>
      </Badge>
      <div style={{ marginTop: '1rem' }}>
        <div style={{ color: 'var(--dark-ink)', fontFamily: 'var(--font-script)', fontSize: '1.55rem', fontWeight: 700 }}>
          {level.title}
        </div>
        
      </div>
    </Card>
  );
}
