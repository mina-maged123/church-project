import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CalendarClock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { levels, getRecentLessonChips } from '../data/levels';
import { LevelCard } from '../components/LevelCard';
import { VersesBanner } from '../components/VersesBanner';
import { SearchBar } from '../components/SearchBar';
import { ProgressBar } from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const Shell = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.25rem 1.25rem 0;
`;

const Hero = styled.section`
  margin-top: 1rem;
  border-radius: var(--radius-xl);
  padding: clamp(1.5rem, 4vw, 3rem);
  background:
    linear-gradient(135deg, rgba(27, 58, 107, 0.98), rgba(139, 26, 26, 0.95)),
    radial-gradient(circle at top left, rgba(201, 168, 76, 0.3), transparent 26%);
  color: rgba(245, 240, 232, 0.96);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-warm);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 16px;
    border: 1px solid rgba(232, 213, 163, 0.24);
    pointer-events: none;
  }

  &::after {
    inset: 28px;
    border-style: dashed;
    opacity: 0.48;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const GlowCard = styled(motion.div)`
  background: rgba(245, 240, 232, 0.12);
  border: 1px solid rgba(232, 213, 163, 0.22);
  border-radius: var(--radius-lg);
  padding: 1.2rem;
  backdrop-filter: blur(10px);
`;

const LevelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const Chip = styled(Link)`
  padding: 0.7rem 0.95rem;
  border-radius: 999px;
  background: rgba(245, 240, 232, 0.88);
  border: 1px solid rgba(201, 168, 76, 0.45);
  box-shadow: 0 10px 18px rgba(26, 18, 8, 0.08);
  font-size: 0.95rem;
`;

export function Home() {
  const [query, setQuery] = useState('');
  const { user, hydrated, lastVisitedLesson, recentLessons } = useAuth();

  if (hydrated && !user) {
    return <Navigate to="/login" replace />;
  }

  const filteredLevels = useMemo(() => {
    if (!query.trim()) return levels;
    const needle = query.trim().toLowerCase();
    return levels.filter((level) => {
      const matchesLevel = `${level.title} ${level.subtitle}`.toLowerCase().includes(needle);
      const matchesSection = level.sections.some((section) => section.title.toLowerCase().includes(needle));
      const matchesLesson = level.sections.some((section) => section.lessons.some((lesson) => lesson.title.toLowerCase().includes(needle)));
      return matchesLevel || matchesSection || matchesLesson;
    });
  }, [query]);

  const chips = recentLessons.length ? recentLessons : getRecentLessonChips();

  return (
    <Shell>
      <Hero>
        <HeroGrid>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'grid', gap: '1rem' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'var(--light-gold)', fontWeight: 700 }}>
                <Sparkles size={18} />
                تعليم قبطى، طقس، ولحن
              </div>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 1.08 }}>
                تعلم التراث القبطي
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                style={{ margin: 0, fontSize: '1.08rem', lineHeight: 1.9, maxWidth: 700, color: 'rgba(245, 240, 232, 0.9)' }}
              >
                Discover the ancient language, hymns, and rituals of the Coptic Church
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
              >
                <VersesBanner />
              </motion.div>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
            <GlowCard
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <SearchBar
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث عن لحن أو درس..."
              />
            </GlowCard>

            {user && lastVisitedLesson ? (
              <GlowCard
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.8rem', color: 'var(--light-gold)', fontWeight: 700 }}>
                  <CalendarClock size={18} />
                  كمّل تعلمك
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{lastVisitedLesson.title}</div>
                <p style={{ marginTop: '0.6rem', color: 'rgba(245, 240, 232, 0.82)' }}>تابع من حيث توقفت في آخر زيارة.</p>
                <ProgressBar value={lastVisitedLesson.progress ?? 68} label="التقدم" />
              </GlowCard>
            ) : null}
          </div>
        </HeroGrid>
      </Hero>

      <section style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ color: 'var(--deep-red)', fontWeight: 700, letterSpacing: '0.04em' }}>المستويات التعليمية</div>
            <h2 style={{ margin: '0.3rem 0 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 3vw, 2.4rem)' }}>اختر المرحلة المناسبة</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--cobalt)' }}>
            <ChevronLeft />
            <ChevronRight />
          </div>
        </div>
        <LevelsGrid>
          {filteredLevels.map((level, index) => (
            <LevelCard key={level.id} level={level} delay={index * 0.1} />
          ))}
        </LevelsGrid>
      </section>

      <section style={{ marginTop: '2.2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ color: 'var(--deep-red)', fontWeight: 700 }}>الدروس الأخيرة</div>
          <h2 style={{ margin: '0.3rem 0 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.8vw, 2rem)' }}>Quick Access</h2>
        </div>
        <ChipRow>
          {chips.map((chip) => (
            <Chip key={chip.path} to={chip.path}>{chip.label}</Chip>
          ))}
        </ChipRow>
      </section>
    </Shell>
  );
}
