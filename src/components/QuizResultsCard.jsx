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

const QuizTitle = styled.div`
  font-size: 0.86rem;
  font-weight: 700;
  line-height: 1.5;
`;

const QuizDate = styled.div`
  margin-top: 0.15rem;
  font-size: 0.72rem;
  color: rgba(26, 18, 8, 0.6);
`;

const Pill = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 4.1rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  background: ${({ $tone }) => $tone.background};
  color: ${({ $tone }) => $tone.color};
`;

const toneForScore = (score) => {
  if (score >= 80) {
    return { background: '#3B6D1118', color: '#3B6D11' };
  }

  if (score >= 60) {
    return { background: '#BA751718', color: '#BA7517' };
  }

  return { background: '#A32D2D18', color: '#A32D2D' };
};

export function QuizResultsCard({ quizzes }) {
  return (
    <Card initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Header>
        <Title>نتائج الكويزات</Title>
      </Header>
      <List>
        {quizzes.map((quiz) => {
          const tone = toneForScore(quiz.score);

          return (
            <Row
              key={`${quiz.quizTitle}-${quiz.date}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <QuizTitle>{quiz.quizTitle}</QuizTitle>
                <QuizDate>{quiz.dateLabel}</QuizDate>
              </div>
              <Pill
                $tone={tone}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28 }}
              >
                {Math.round(quiz.score)}%
              </Pill>
            </Row>
          );
        })}
      </List>
    </Card>
  );
}