import styled from 'styled-components';
import { motion } from 'framer-motion';

const Shell = styled(motion.section)`
  border-radius: var(--radius-xl);
  border: 1px solid rgba(201, 168, 76, 0.18);
  background: var(--color-background-secondary);
  box-shadow: var(--shadow-warm);
  padding: 1rem;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  font-family: var(--font-script);
  font-size: 1.2rem;
`;

const List = styled.div`
  display: grid;
  gap: 0.85rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 4.5rem;
  gap: 0.75rem;
  align-items: center;
`;

const Label = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
`;

const BarTrack = styled.div`
  height: 8px;
  border-radius: 4px;
  background: rgba(26, 18, 8, 0.08);
  overflow: hidden;
`;

const BarFill = styled(motion.div)`
  height: 100%;
  border-radius: inherit;
  background: ${({ $color }) => $color};
`;

const Percent = styled.div`
  font-size: 0.75rem;
  color: rgba(26, 18, 8, 0.6);
  text-align: left;
`;

export function SectionProgress({ sections }) {
  return (
    <Shell initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Title>تقدّم الأقسام</Title>
      <List>
        {sections.map((section) => (
          <Row key={section.label}>
            <Label>{section.label}</Label>
            <BarTrack>
              <BarFill
                $color={section.color}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, section.progress))}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              />
            </BarTrack>
            <Percent>{Math.round(section.progress)}%</Percent>
          </Row>
        ))}
      </List>
    </Shell>
  );
}