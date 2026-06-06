import { Link, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getLevelById, getSectionById } from '../data/levels';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';

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

const LessonCard = styled(motion.div)`
  border-radius: var(--radius-lg);
  border: 1px solid rgba(201, 168, 76, 0.48);
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.98), rgba(232, 213, 163, 0.42));
  box-shadow: var(--shadow-warm);
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--gold), var(--light-gold));
  color: var(--dark-ink);
  font-weight: 700;
`;

export function SectionPage() {
  const { levelId, sectionId } = useParams();
  const level = getLevelById(levelId);
  const section = getSectionById(level, sectionId);

  if (!level || !section) {
    return <Navigate to="/" replace />;
  }

  return (
    <Shell>
      <div style={{ marginBottom: '1.2rem' }}>
        <Link to={`/level/${level.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--cobalt)', fontWeight: 700 }}>
          <ArrowLeft size={16} /> العودة إلى المستوى
        </Link>
        <h1 style={{ margin: '0.8rem 0 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{section.title}</h1>
        <p style={{ marginTop: '0.6rem', lineHeight: 1.9, maxWidth: 760 }}>{section.description}</p>
      </div>

      <Grid>
        {section.lessons.map((lesson, index) => (
          <LessonCard key={lesson.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            <div>
              <div style={{ color: 'var(--deep-red)', fontWeight: 700 }}>درس {index + 1}</div>
              <h2 style={{ margin: '0.35rem 0 0', fontSize: '1.3rem', fontFamily: 'Amiri, var(--font-display)', fontWeight: 800 }}>{lesson.title}</h2>
              {lesson.titleCoptic && (
                <div style={{ marginTop: '0.25rem', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(26,18,8,0.7)' }}>{lesson.titleCoptic}</div>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', color: 'rgba(26, 18, 8, 0.8)', alignItems: 'center' }}>
              <span>⏱ {lesson.duration}</span>
              <span>•</span>
              <span>{lesson.difficulty}</span>
            </div>
            <Button to={`/level/${level.id}/section/${section.id}/lesson/${lesson.id}`}>
              <Play size={16} /> Start Lesson ▶
            </Button>
          </LessonCard>
        ))}
      </Grid>
    </Shell>
  );
}
