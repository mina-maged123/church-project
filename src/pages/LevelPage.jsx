import { Link, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getLevelById } from '../data/levels';
import { SectionCard } from '../components/SectionCard';

const Shell = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.25rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  margin-bottom: 1.3rem;
`;

export function LevelPage() {
  const { levelId } = useParams();
  const level = getLevelById(levelId);

  if (!level) {
    return <Navigate to="/" replace />;
  }

  return (
    <Shell>
      <Header>
        <div style={{ color: 'var(--deep-red)', fontWeight: 700 }}>Level {level.id}</div>
        <h1 style={{ margin: '0.35rem 0 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{level.title}</h1>
        <p style={{ marginTop: '0.8rem', maxWidth: 760, lineHeight: 1.9 }}>اختر القسم الذي تريد مواصلة التعلم فيه. كل قسم يقودك إلى الدروس المناسبة ثم إلى الاختبار التفاعلي.</p>
        <Link to="/" style={{ color: 'var(--cobalt)', fontWeight: 700 }}>العودة للرئيسية</Link>
      </Header>

      <Grid>
        {level.sections.map((section, index) => (
          <SectionCard key={section.id} section={section} levelId={level.id} delay={index * 0.1} />
        ))}
      </Grid>
    </Shell>
  );
}
