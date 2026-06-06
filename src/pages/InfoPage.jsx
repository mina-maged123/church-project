import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Shell = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.25rem 0;
`;

const Panel = styled.div`
  border-radius: var(--radius-xl);
  border: 1px solid rgba(201, 168, 76, 0.48);
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.98), rgba(232, 213, 163, 0.42));
  box-shadow: var(--shadow-warm);
  padding: 1.4rem;
`;

export function InfoPage({ title, description }) {
  return (
    <Shell>
      <Panel>
        <div style={{ color: 'var(--deep-red)', fontWeight: 700 }}>{title}</div>
        <h1 style={{ margin: '0.4rem 0 0', fontFamily: 'var(--font-display)' }}>{title}</h1>
        <p style={{ marginTop: '1rem', lineHeight: 1.9 }}>{description}</p>
        <Link to="/" style={{ color: 'var(--cobalt)', fontWeight: 700 }}>العودة للرئيسية</Link>
      </Panel>
    </Shell>
  );
}
