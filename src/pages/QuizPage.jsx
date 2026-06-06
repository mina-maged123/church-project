import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2 } from 'lucide-react';
import { getLevelById, getLessonById, getSectionById } from '../data/levels';

const Shell = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1.25rem 0;
`;

const Panel = styled.div`
  border-radius: var(--radius-xl);
  border: 1px solid rgba(201, 168, 76, 0.48);
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.98), rgba(232, 213, 163, 0.42));
  box-shadow: var(--shadow-warm);
  padding: 1.25rem;
`;

const OptionButton = styled.button`
  width: 100%;
  border-radius: 18px;
  border: 1px solid ${({ $selected }) => ($selected ? 'rgba(201, 168, 76, 0.9)' : 'rgba(26, 18, 8, 0.16)')};
  background: ${({ $selected }) => ($selected ? 'rgba(201, 168, 76, 0.2)' : 'rgba(255, 255, 255, 0.28)')};
  color: var(--dark-ink);
  padding: 0.95rem 1rem;
  text-align: right;
  font-weight: 700;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--gold), var(--light-gold));
  color: var(--dark-ink);
  font-weight: 700;
`;

export function QuizPage() {
  const { levelId, sectionId, lessonId } = useParams();
  const level = getLevelById(levelId);
  const section = getSectionById(level, sectionId);
  const lesson = getLessonById(level, sectionId, lessonId);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!lesson) return 0;
    return lesson.quiz.reduce((total, item, index) => total + (selectedAnswers[index] === item.answer ? 1 : 0), 0);
  }, [lesson, selectedAnswers]);

  if (!level || !section || !lesson) {
    return <Navigate to="/" replace />;
  }

  const percent = Math.round((score / lesson.quiz.length) * 100);

  return (
    <Shell>
      <Link to={`/level/${level.id}/section/${section.id}/lesson/${lesson.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--cobalt)', fontWeight: 700 }}>
        <ArrowLeft size={16} /> العودة للدرس
      </Link>

      <div style={{ marginTop: '1rem' }}>
        <Panel>
          <div style={{ color: 'var(--deep-red)', fontWeight: 700 }}>Quiz</div>
          <h1 style={{ margin: '0.35rem 0 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{lesson.title}</h1>
          <p style={{ marginTop: '0.7rem', lineHeight: 1.8 }}>أجب عن الأسئلة التالية ثم اضغط زر الإنهاء لمراجعة النتيجة.</p>
        </Panel>

        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          {lesson.quiz.map((question, questionIndex) => (
            <Panel key={question.prompt}>
              <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>{question.prompt}</h2>
              <div style={{ display: 'grid', gap: '0.7rem', marginTop: '1rem' }}>
                {question.options.map((option) => (
                  <OptionButton
                    key={option}
                    type="button"
                    $selected={selectedAnswers[questionIndex] === option}
                    onClick={() => setSelectedAnswers((current) => ({ ...current, [questionIndex]: option }))}
                  >
                    {option}
                  </OptionButton>
                ))}
              </div>
            </Panel>
          ))}
        </div>

        <Panel style={{ marginTop: '1rem' }}>
          {!submitted ? (
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              style={{
                border: 0,
                borderRadius: 999,
                padding: '0.95rem 1.15rem',
                background: 'linear-gradient(135deg, var(--gold), var(--light-gold))',
                color: 'var(--dark-ink)',
                fontWeight: 700,
              }}
            >
              إنهاء الاختبار
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'grid', gap: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', color: 'var(--deep-red)', fontWeight: 700 }}>
                <Award size={20} /> النتيجة النهائية
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 4rem)' }}>{score} / {lesson.quiz.length}</div>
              <div style={{ color: 'rgba(26, 18, 8, 0.8)', fontSize: '1.05rem' }}>Score: {percent}%</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--muted-green)', fontWeight: 700 }}>
                <CheckCircle2 size={18} /> تمت مراجعة إجاباتك بنجاح
              </div>
              <ActionButton to={`/level/${level.id}/section/${section.id}`}>العودة للدروس</ActionButton>
            </motion.div>
          )}
        </Panel>
      </div>
    </Shell>
  );
}
