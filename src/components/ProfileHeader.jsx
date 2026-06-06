import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SCHOOL_NAME } from '../config';

const Shell = styled(motion.section)`
  border-radius: var(--radius-xl);
  border: 1px solid rgba(201, 168, 76, 0.22);
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.98), rgba(232, 213, 163, 0.26));
  box-shadow: var(--shadow-warm);
  padding: clamp(1.1rem, 3vw, 1.6rem);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Avatar = styled.div`
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  border: 2px solid #c9a84c;
  overflow: hidden;
  background: rgba(201, 168, 76, 0.12);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  color: var(--dark-ink);
  font-family: var(--font-script);
  font-size: 1.6rem;
  font-weight: 700;
`;

const Meta = styled.div`
  display: grid;
  gap: 0.3rem;
  min-width: 0;
`;

const Name = styled.h1`
  margin: 0;
  font-family: var(--font-script);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
`;

const Level = styled.div`
  color: rgba(26, 18, 8, 0.72);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  margin-top: 0.2rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(139, 26, 26, 0.08);
  color: var(--deep-red);
  font-size: 0.8rem;
  font-weight: 700;
`;

export function ProfileHeader({ user }) {
  const avatarLetter = (user?.name || SCHOOL_NAME).trim().charAt(0);

  return (
    <Shell initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <HeaderRow>
        <Avatar aria-hidden="true">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>{avatarLetter}</span>
          )}
        </Avatar>
        <Meta>
          <Name>{user?.name || SCHOOL_NAME}</Name>
          <Level>{user?.levelName} - {user?.subLevel}</Level>
          <Badge>مخدوم نشيط ✝</Badge>
        </Meta>
      </HeaderRow>
    </Shell>
  );
}