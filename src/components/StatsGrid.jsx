import styled from 'styled-components';
import { motion } from 'framer-motion';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.9rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  border-radius: var(--radius-lg);
  border: 1px solid rgba(201, 168, 76, 0.18);
  background: var(--color-background-secondary);
  box-shadow: var(--shadow-warm);
  padding: 1rem;
  min-height: 118px;
`;

const Label = styled.div`
  color: rgba(26, 18, 8, 0.56);
  font-size: 0.75rem;
  line-height: 1.5;
`;

const Value = styled.div`
  margin-top: 0.45rem;
  color: ${({ $tone }) => ($tone === 'crimson' ? 'var(--deep-red)' : 'var(--gold)')};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
`;

const SubLabel = styled.div`
  margin-top: 0.4rem;
  color: rgba(26, 18, 8, 0.64);
  font-size: 0.8rem;
  line-height: 1.5;
`;

export function StatsGrid({ stats }) {
  return (
    <Grid variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="show">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        >
          <Label>{stat.label}</Label>
          <Value $tone={stat.tone}>{stat.value}</Value>
          <SubLabel>{stat.subLabel}</SubLabel>
        </Card>
      ))}
    </Grid>
  );
}