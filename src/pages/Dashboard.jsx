import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { SCHOOL_NAME } from '../config';
import { useAuth } from '../context/AuthContext';
import { ProfileHeader } from '../components/ProfileHeader';
import { StatsGrid } from '../components/StatsGrid';
import { LessonsCard } from '../components/LessonsCard';
import { QuizResultsCard } from '../components/QuizResultsCard';
import { SectionProgress } from '../components/SectionProgress';

const Shell = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.25rem 1.25rem 2rem;
  display: grid;
  gap: 1rem;
  direction: rtl;
  font-family: var(--font-script);
`;

const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const VerseFooter = styled.footer`
  border-top: 1px solid rgba(201, 168, 76, 0.42);
  padding-top: 0.85rem;
  color: rgba(26, 18, 8, 0.62);
  font-size: 0.75rem;
  font-style: italic;
  line-height: 1.7;
`;

const verseOptions = [
  { coptic: 'ⲡϫⲟⲉⲓⲥ ⲛⲁⲓ ⲉⲣⲟⲓ', translation: 'Lord, have mercy' },
  { coptic: 'ⲡⲛⲉⲩⲙⲁ ⲉⲧⲟⲩⲁⲁⲃ', translation: 'The Holy Spirit' },
  { coptic: 'ⲫⲱⲥ ⲛ̀ⲁⲅⲓⲟⲛ', translation: 'Holy Light' },
  { coptic: 'Ⲡⲛⲉⲩⲙⲁ ⲛ̀ⲧⲉ Ⲡⲓⲱⲧ', translation: 'Spirit of the Father' },
];

const sectionLabelMap = {
  chants: 'ألحان',
  coptic: 'قبطي',
  liturgical: 'طقسي',
};

const sectionColorMap = {
  chants: '#C9A84C',
  coptic: '#1B3A6B',
  liturgical: '#8B1A1A',
};

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB');
};

const getLastActivityLabel = (lessonProgress, quizResults) => {
  const allDates = [...lessonProgress, ...quizResults]
    .map((item) => item.updatedAt || item.date)
    .filter(Boolean)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((left, right) => right.getTime() - left.getTime());

  if (!allDates.length) return 'اليوم';

  const latest = allDates[0];
  const today = new Date();
  return latest.toDateString() === today.toDateString() ? 'اليوم' : latest.toLocaleDateString('en-GB');
};

const getVerseIndex = () => {
  if (typeof window === 'undefined') return 0;

  const storageKey = 'dashboard-verse-index';
  const current = Number.parseInt(window.localStorage.getItem(storageKey) ?? '0', 10);
  const safeCurrent = Number.isNaN(current) ? 0 : current;
  const nextIndex = (safeCurrent + 1) % verseOptions.length;
  window.localStorage.setItem(storageKey, String(nextIndex));
  return safeCurrent % verseOptions.length;
};

export function Dashboard() {
  const { user } = useAuth();
  const [verseIndex, setVerseIndex] = useState(0);

  useEffect(() => {
    setVerseIndex(getVerseIndex());
  }, []);

  const verse = verseOptions[verseIndex] ?? verseOptions[0];

  const data = useMemo(() => {
    const lessonProgress = Array.isArray(user?.lessonProgress) ? user.lessonProgress : [];
    const quizResults = Array.isArray(user?.quizResults) ? user.quizResults : [];

    const completedLessons = lessonProgress.filter((item) => item.progressPercent >= 100).length;
    const averageScore = quizResults.length
      ? Math.round(quizResults.reduce((sum, item) => sum + Number(item.score || 0), 0) / quizResults.length)
      : 0;

    const sectionTotals = ['chants', 'coptic', 'liturgical'].map((sectionId) => {
      const lessonsInSection = lessonProgress.filter((item) => item.section === sectionId);
      const completedInSection = lessonsInSection.filter((item) => item.progressPercent >= 100).length;

      return {
        label: sectionLabelMap[sectionId],
        color: sectionColorMap[sectionId],
        progress: lessonsInSection.length ? (completedInSection / lessonsInSection.length) * 100 : 0,
      };
    });

    const lessons = [...lessonProgress]
      .sort((left, right) => right.lessonId - left.lessonId)
      .slice(0, 4)
      .map((item) => ({
        ...item,
        sectionLabel: sectionLabelMap[item.section] ?? item.section,
      }));

    const quizzes = [...quizResults]
      .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
      .slice(0, 3)
      .map((item) => ({
        ...item,
        dateLabel: formatDate(item.date),
      }));

    return {
      lessonProgress,
      quizResults,
      completedLessons,
      averageScore,
      sectionTotals,
      lessons,
      quizzes,
      lastActivityLabel: getLastActivityLabel(lessonProgress, quizResults),
    };
  }, [user]);

  const stats = [
    {
      label: 'الدروس المكتملة',
      value: data.completedLessons,
      subLabel: `من أصل ${data.lessonProgress.length} درس`,
      tone: 'gold',
    },
    {
      label: 'الكويزات',
      value: data.quizResults.length,
      subLabel: 'كويزات تم حلها',
      tone: 'crimson',
    },
    {
      label: 'متوسط النتايج',
      value: `${data.averageScore}%`,
      subLabel: 'في الكويزات',
      tone: 'gold',
    },
    {
      label: 'آخر نشاط',
      value: data.lastActivityLabel,
      subLabel: SCHOOL_NAME,
      tone: 'crimson',
    },
  ];

  return (
    <Shell>
      <ProfileHeader user={user} />
      <StatsGrid stats={stats} />
      <SplitGrid>
        <LessonsCard lessons={data.lessons} />
        <QuizResultsCard quizzes={data.quizzes} />
      </SplitGrid>
      <SectionProgress sections={data.sectionTotals} />
      <VerseFooter>
        {verse.coptic} — {verse.translation}
      </VerseFooter>
    </Shell>
  );
}