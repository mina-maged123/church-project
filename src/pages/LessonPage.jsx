import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { getLevelById, getLessonById, getSectionById } from '../data/levels';
import { useAuth } from '../context/AuthContext';

const Shell = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1.25rem 0;
`;

const Stage = styled.div`
  border-radius: var(--radius-xl);
  border: 1px solid rgba(201, 168, 76, 0.48);
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.98), rgba(232, 213, 163, 0.42));
  box-shadow: var(--shadow-warm);
  padding: 1rem;
`;

const BackButton = styled.button`
  border: 0;
  background: linear-gradient(135deg, var(--gold), var(--light-gold));
  color: var(--dark-ink);
  font-weight: 800;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  box-shadow: var(--shadow-warm);
  margin-bottom: 1rem;
  cursor: pointer;
`;

export function LessonPage() {
  const navigate = useNavigate();
  const { levelId, sectionId, lessonId } = useParams();
  const level = getLevelById(levelId);
  const section = getSectionById(level, sectionId);
  const lesson = getLessonById(level, sectionId, lessonId);
  const { addRecentLesson } = useAuth();
  const embedVideoUrl = (() => {
    const src = lesson?.videoUrl;
    if (!src) return null;
    try {
      const u = new URL(src);
      const host = u.hostname.replace('www.', '');
      if (host === 'youtu.be') {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}${u.search}`;
      }
      if (host === 'youtube.com' || host === 'm.youtube.com' || host.endsWith('.youtube.com')) {
        if (u.pathname === '/watch') {
          const id = u.searchParams.get('v');
          if (id) return `https://www.youtube.com/embed/${id}` + (u.search ? u.search.replace(/v=[^&]+&?/, '') : '');
        }
        if (u.pathname.startsWith('/embed/')) return src;
      }
    } catch (e) {
      // fall back to original src
    }
    return src;
  })();

  useEffect(() => {
    if (lesson && level && section) {
      addRecentLesson({
        id: lesson.id,
        title: lesson.title,
        path: `/level/${level.id}/section/${section.id}/lesson/${lesson.id}`,
        progress: 68,
      });
    }
  }, [addRecentLesson, lesson, level, section]);

  if (!level || !section || !lesson) {
    return <Navigate to="/" replace />;
  }

  return (
    <Shell>
      <BackButton type="button" onClick={() => navigate(-1)}>
        الرجوع للصفحة السابقة
      </BackButton>
      <Stage>
        {lesson?.melodyImage ? (
          <img
            src={lesson.melodyImage}
            alt={lesson.title + ' notation'}
            style={{ width: '100%', display: 'block', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)' }}
          />
        ) : null}

        {embedVideoUrl ? (
          <div style={{ marginTop: '1rem', position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              title="lesson-video"
              src={embedVideoUrl}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, borderRadius: 10 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
      </Stage>
    </Shell>
  );
}
