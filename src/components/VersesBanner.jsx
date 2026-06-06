import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { verses } from '../data/levels';

const Banner = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(232, 213, 163, 0.35);
  background: linear-gradient(135deg, rgba(27, 58, 107, 0.97), rgba(139, 26, 26, 0.96));
  padding: 1.35rem 1.5rem;
  min-height: 122px;
  box-shadow: var(--shadow-warm);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 10px;
    border: 1px solid rgba(232, 213, 163, 0.28);
    pointer-events: none;
  }

  &::after {
    inset: 18px;
    border-style: dashed;
    opacity: 0.45;
  }
`;

const Pattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.18;
  background-image:
    linear-gradient(45deg, transparent 45%, rgba(232, 213, 163, 0.7) 45%, rgba(232, 213, 163, 0.7) 55%, transparent 55%),
    linear-gradient(-45deg, transparent 45%, rgba(232, 213, 163, 0.7) 45%, rgba(232, 213, 163, 0.7) 55%, transparent 55%),
    linear-gradient(90deg, rgba(232, 213, 163, 0.22) 1px, transparent 1px),
    linear-gradient(rgba(232, 213, 163, 0.22) 1px, transparent 1px);
  background-size: 84px 84px;
`;

const VerseCoptic = styled.div`
  font-family: var(--font-script);
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  color: var(--light-gold);
  line-height: 1.4;
`;

const VerseArabic = styled.div`
  margin-top: 0.5rem;
  color: rgba(245, 240, 232, 0.92);
  font-size: 0.98rem;
`;

export function VersesBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % verses.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentVerse = verses[index];

  return (
    <Banner>
      <Pattern />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVerse.coptic}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <VerseCoptic>{currentVerse.coptic}</VerseCoptic>
          <VerseArabic>{currentVerse.arabic}</VerseArabic>
        </motion.div>
      </AnimatePresence>
    </Banner>
  );
}
