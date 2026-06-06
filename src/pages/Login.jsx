import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, LoaderCircle, Lock, LogIn, Mail } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FormField } from '../components/FormField';
import { SCHOOL_NAME } from '../config';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/logo.png';

const Shell = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.35), transparent 30%),
    linear-gradient(180deg, #f5f0e8 0%, #efe5d4 100%);
  color: var(--dark-ink);
  font-family: var(--font-script);
`;

const Card = styled(motion.section)`
  width: min(100%, 420px);
  border-radius: 30px;
  border: 1px solid rgba(201, 168, 76, 0.52);
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.98), rgba(242, 234, 219, 0.96));
  box-shadow: var(--shadow-warm);
  padding: 1.4rem;
  position: relative;
  overflow: hidden;
`;

const LogoArea = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.35rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.42);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: rgba(26, 18, 8, 0.66);
`;

const Verse = styled.p`
  margin: 0;
  font-size: 0.69rem;
  color: rgba(26, 18, 8, 0.64);
  font-style: italic;
`;

const Form = styled.form`
  display: grid;
  gap: 0.9rem;
  padding-top: 1rem;
`;

const InputShell = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 15px;
  border: 1px solid ${({ $error }) => ($error ? 'rgba(161, 31, 31, 0.65)' : 'rgba(139, 26, 26, 0.14)')};
  background: rgba(255, 255, 255, 0.86);
  color: var(--dark-ink);
  padding: 0.85rem 2.9rem 0.85rem 1rem;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;

  &:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 4px rgba(201, 168, 76, 0.14);
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  inset-inline-end: 0.8rem;
  inset-block-start: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: rgba(26, 18, 8, 0.66);
  display: inline-grid;
  place-items: center;
  padding: 0;
`;

const LinkRow = styled.div`
  width: 100%;
  text-align: left;
`;

const ActionButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 16px;
  padding: 0.95rem 1rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  background: #8b1a1a;
  color: #f5f0e8;
  box-shadow: 0 14px 26px rgba(139, 26, 26, 0.22);

  &:disabled {
    opacity: 0.72;
    cursor: progress;
  }
`;

const FooterVerse = styled.div`
  margin-top: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(201, 168, 76, 0.42);
  text-align: center;
  font-size: 0.69rem;
  color: rgba(26, 18, 8, 0.68);
  font-style: italic;
`;

const ErrorBanner = styled.div`
  border-radius: 14px;
  background: #b3261e;
  color: #fff;
  padding: 0.8rem 0.9rem;
  font-size: 0.86rem;
  line-height: 1.6;
`;

const Spinner = styled(LoaderCircle)`
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const labelStyles = { fontSize: '0.92rem', fontWeight: 700 };

export function Login() {
  const navigate = useNavigate();
  const { login, user, hydrated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const canRender = hydrated;

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!password) {
      nextErrors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 8) {
      nextErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!validate()) return;

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result?.ok) {
      setFormError(result?.message || 'البريد أو كلمة المرور غلط');
      setFieldErrors({ email: ' ', password: ' ' });
      return;
    }

    navigate('/home', { replace: true });
  };

  const disabled = useMemo(() => loading, [loading]);

  if (!canRender) return null;

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Shell>
      <Card
        dir="rtl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <LogoArea>
          <img src={logo} alt={SCHOOL_NAME} style={{ width: 68, height: 68, objectFit: 'contain' }} />
          <div style={labelStyles}>{SCHOOL_NAME}</div>
          <Verse>ⲡϫⲟⲉⲓⲥ ⲛⲁⲓ ⲉⲣⲟⲓ</Verse>
        </LogoArea>

        <div style={{ paddingTop: '1rem' }}>
          <Title>أهلاً بك</Title>
          <Subtitle>سجل دخولك للمتابعة</Subtitle>
        </div>

        <Form onSubmit={handleSubmit}>
          <AnimatePresence>
            {formError ? <ErrorBanner>{formError}</ErrorBanner> : null}
          </AnimatePresence>

          <FormField label="البريد الإلكتروني" icon={Mail} error={fieldErrors.email}>
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="example@church.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (formError) setFormError('');
              }}
              $error={Boolean(fieldErrors.email)}
            />
          </FormField>

          <FormField label="كلمة المرور" icon={Lock} error={fieldErrors.password}>
            <InputShell>
              <Input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (formError) setFormError('');
                }}
                $error={Boolean(fieldErrors.password)}
              />
              <ToggleButton type="button" aria-label="إظهار أو إخفاء كلمة المرور" onClick={() => setShowPassword((current) => !current)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </ToggleButton>
            </InputShell>
          </FormField>

          <LinkRow>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              style={{
                border: 0,
                background: 'transparent',
                color: 'var(--gold)',
                fontSize: '0.69rem',
                padding: 0,
                fontWeight: 700,
              }}
            >
              نسيت كلمة المرور؟
            </button>
          </LinkRow>

          <ActionButton type="submit" disabled={disabled}>
            {loading ? <Spinner size={16} /> : <LogIn size={16} />}
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </ActionButton>

          <div style={{ textAlign: 'center', fontSize: '0.69rem', color: 'rgba(26, 18, 8, 0.72)' }}>
            مش عندك حساب؟{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              style={{ border: 0, background: 'transparent', color: 'var(--deep-red)', fontWeight: 700, padding: 0 }}
            >
              سجل دلوقتي
            </button>
          </div>
        </Form>

        <FooterVerse>ⲡⲁⲥⲱⲧⲏⲣ ⲛⲁⲓ ⲉⲣⲟⲓ — My Savior, have mercy</FooterVerse>
      </Card>
    </Shell>
  );
}