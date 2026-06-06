import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.section)`
  border-radius: var(--radius-xl);
  border: 1px solid rgba(201, 168, 76, 0.18);
  background: var(--color-background-secondary);
  box-shadow: var(--shadow-warm);
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-family: var(--font-script);
  font-size: 1.2rem;
`;

const List = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.9rem;
  align-items: center;
  padding: 0.8rem 0.85rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(201, 168, 76, 0.12);
`;

const LessonTitle = styled.div`
  font-size: 0.86rem;
  font-weight: 700;
  line-height: 1.5;
`;

const SectionName = styled.div`
  margin-top: 0.15rem;
  font-size: 0.72rem;
  color: rgba(26, 18, 8, 0.6);
`;

const ProgressWrap = styled.div`
  width: 5rem;
  display: grid;
  justify-items: end;
  gap: 0.25rem;
`;

const Track = styled.div`
  width: 5rem;
  height: 5px;
  border-radius: 999px;
  background: rgba(26, 18, 8, 0.08);
  overflow: hidden;
`;

const Fill = styled(motion.div)`
  height: 100%;
  border-radius: inherit;
  background: ${({ $complete }) => ($complete ? '#c9a84c' : '#8b1a1a')};
`;

const Status = styled.div`
  font-size: 0.72rem;
  color: ${({ $complete }) => ($complete ? 'var(--gold)' : 'var(--deep-red)')};
  font-weight: 700;
`;

export function LessonsCard({ lessons }) {
  return (
    <Card initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Header>
        <Title>آخر الدروس</Title>
      </Header>
      <List>
        {lessons.map((lesson) => {
          const complete = lesson.progressPercent >= 100;

          return (
            <Row
              key={lesson.lessonId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <LessonTitle>{lesson.title}</LessonTitle>
                <SectionName>{lesson.sectionLabel}</SectionName>
              </div>
              <ProgressWrap>
                <Track>
                  <Fill
                    $complete={complete}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(0, Math.min(100, lesson.progressPercent))}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  />
                </Track>
                <Status $complete={complete}>{complete ? 'مكتمل' : `${Math.round(lesson.progressPercent)}%`}</Status>
              </ProgressWrap>
            </Row>
          );
        })}
      </List>
    </Card>
  );
}