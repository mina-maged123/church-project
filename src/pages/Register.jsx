import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LoaderCircle, Lock, Mail, PenSquare, User } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BirthdateSelect } from '../components/BirthdateSelect';
import { FormField } from '../components/FormField';
import { StepIndicator } from '../components/StepIndicator';
import { SCHOOL_NAME } from '../config';
import { levels } from '../data/levels';
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
  overflow: hidden;
`;

const Head = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.65rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.42);
`;

const Title = styled.h1`
  margin: 0.15rem 0 0;
  font-size: 1rem;
  font-weight: 500;
`;

const Subheading = styled.p`
  margin: 0.15rem 0 0;
  font-size: 0.82rem;
  color: rgba(26, 18, 8, 0.66);
`;

const Form = styled.form`
  display: grid;
  gap: 0.9rem;
  padding-top: 1rem;
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

  &:read-only {
    background: rgba(245, 240, 232, 0.9);
    color: rgba(26, 18, 8, 0.68);
  }
`;

const InputShell = styled.div`
  position: relative;
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

const Select = styled.select`
  width: 100%;
  border-radius: 15px;
  border: 1px solid ${({ $error }) => ($error ? 'rgba(161, 31, 31, 0.65)' : 'rgba(139, 26, 26, 0.14)')};
  background: rgba(255, 255, 255, 0.86);
  color: var(--dark-ink);
  padding: 0.85rem 0.95rem;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;

  &:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 4px rgba(201, 168, 76, 0.14);
  }
`;

const Section = styled(motion.div)`
  display: grid;
  gap: 0.9rem;
`;

const StepCopy = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: rgba(26, 18, 8, 0.66);
`;

const ErrorBanner = styled.div`
  border-radius: 14px;
  background: #b3261e;
  color: #fff;
  padding: 0.8rem 0.9rem;
  font-size: 0.86rem;
  line-height: 1.6;
`;

const NavRow = styled.div`
  display: grid;
  gap: 0.7rem;
  margin-top: 0.35rem;
`;

const PrimaryButton = styled.button`
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

const GhostButton = styled.button`
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--gold);
  background: rgba(255, 255, 255, 0.4);
  color: #8b1a1a;
  padding: 0.85rem 1rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Summary = styled.div`
  display: grid;
  gap: 0.65rem;
  border-radius: 18px;
  border: 1px solid rgba(201, 168, 76, 0.4);
  background: rgba(255, 255, 255, 0.55);
  padding: 0.95rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  align-items: flex-start;
  font-size: 0.86rem;
`;

const SummaryLabel = styled.span`
  color: rgba(26, 18, 8, 0.72);
  font-weight: 700;
`;

const SummaryValue = styled.span`
  color: var(--dark-ink);
  text-align: left;
  flex: 1;
`;

const EditButton = styled.button`
  border: 0;
  background: transparent;
  color: var(--gold);
  padding: 0;
  font-size: 0.75rem;
  font-weight: 700;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.82rem;
  color: var(--dark-ink);
`;

const SmallError = styled.div`
  margin-top: 0.2rem;
  font-size: 0.75rem;
  color: #a11f1f;
`;

const Spinner = styled(LoaderCircle)`
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const displayNumber = (value) => new Intl.NumberFormat('ar-EG').format(value);

const stepVariants = {
  enter: (direction) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

const allowedLevelIds = new Set(levels.map((level) => String(level.id)));

const levelOptions = levels.map((level) => ({
  value: String(level.id),
  label: `${level.name} — ${level.subLevel}`,
}));

export function Register() {
  const navigate = useNavigate();
  const { register, user, hydrated } = useAuth();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthdate: { day: '', month: '', year: '' },
    level: '',
    termsAccepted: false,
  });

  const nextStep = (targetStep) => {
    setDirection(targetStep > step ? 1 : -1);
    setStep(targetStep);
  };

  const validateStep1 = () => {
    const nextErrors = {};

    if (!data.email.trim()) {
      nextErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!data.password) {
      nextErrors.password = 'كلمة المرور مطلوبة';
    } else if (data.password.length < 8) {
      nextErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    } else if (!/\d/.test(data.password)) {
      nextErrors.password = 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل';
    }

    if (!data.confirmPassword) {
      nextErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (data.confirmPassword !== data.password) {
      nextErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};

    if (!data.name.trim()) {
      nextErrors.name = 'الاسم مطلوب';
    } else if (data.name.trim().length < 3) {
      nextErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!data.birthdate.day || !data.birthdate.month || !data.birthdate.year) {
      nextErrors.birthdate = 'تاريخ الميلاد مطلوب';
    }

    if (!data.level || !allowedLevelIds.has(data.level)) {
      nextErrors.level = 'المرحلة الدراسية مطلوبة';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = () => {
    const nextErrors = {};

    if (!data.termsAccepted) {
      nextErrors.termsAccepted = 'يجب الموافقة على شروط الاستخدام';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    setFormError('');
    const valid = step === 1 ? validateStep1() : validateStep2();
    if (!valid) return;
    nextStep(step + 1);
  };

  const handleBack = () => {
    setFormError('');
    setFieldErrors({});
    nextStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (step === 1) {
      if (!validateStep1()) return;
      nextStep(2);
      return;
    }

    if (step === 2) {
      if (!validateStep2()) return;
      nextStep(3);
      return;
    }

    if (!validateStep3()) return;

    setLoading(true);
    const result = await register(data);
    setLoading(false);

    if (!result?.ok) {
      setFieldErrors(result?.fieldErrors || {});
      if (result?.fieldErrors?.email) {
        setFormError(result.fieldErrors.email);
        setDirection(-1);
        setStep(1);
      }
    }
  };

  const summaryBirthdate = [data.birthdate.day, data.birthdate.month, data.birthdate.year]
    .map((value) => (value ? displayNumber(value) : '—'))
    .join(' / ');

  const summaryLevel = levelOptions.find((option) => option.value === data.level)?.label || '—';

  const goToFieldStep = (field) => {
    const targetStep = field === 'email' ? 1 : 2;
    setDirection(targetStep > step ? 1 : -1);
    setStep(targetStep);
  };

  if (!hydrated) return null;

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
        <Head>
          <img src={logo} alt={SCHOOL_NAME} style={{ width: 68, height: 68, objectFit: 'contain' }} />
          <div style={{ fontSize: '0.96rem', fontWeight: 700 }}>{SCHOOL_NAME}</div>
          <StepIndicator currentStep={step} />
        </Head>

        <Form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait" custom={direction}>
            <Section
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {step === 1 ? (
                <>
                  <Title>خطوة ١ من ٣ — بيانات الحساب</Title>
                  <Subheading>أنشئ بيانات الدخول الخاصة بك</Subheading>

                  {formError ? <ErrorBanner>{formError}</ErrorBanner> : null}

                  <FormField label="البريد الإلكتروني" icon={Mail} error={fieldErrors.email}>
                    <Input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="example@church.com"
                      value={data.email}
                      onChange={(event) => setData((current) => ({ ...current, email: event.target.value }))}
                      $error={Boolean(fieldErrors.email)}
                    />
                  </FormField>

                  <FormField label="كلمة المرور" icon={Lock} error={fieldErrors.password}>
                    <InputShell>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        value={data.password}
                        onChange={(event) => setData((current) => ({ ...current, password: event.target.value }))}
                        $error={Boolean(fieldErrors.password)}
                        style={{ paddingInlineEnd: '3rem' }}
                      />
                      <ToggleButton
                        type="button"
                        aria-label="إظهار أو إخفاء كلمة المرور"
                        onClick={() => setShowPassword((current) => !current)}
                      >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </ToggleButton>
                    </InputShell>
                  </FormField>

                    <FormField label="تأكيد كلمة المرور" icon={Lock} error={fieldErrors.confirmPassword}>
                    <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={data.confirmPassword}
                      onChange={(event) => setData((current) => ({ ...current, confirmPassword: event.target.value }))}
                      $error={Boolean(fieldErrors.confirmPassword)}
                        style={{ paddingInlineEnd: '3rem' }}
                    />
                      <ToggleButton
                        type="button"
                        aria-label="إظهار أو إخفاء تأكيد كلمة المرور"
                        onClick={() => setShowConfirmPassword((current) => !current)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </ToggleButton>
                  </FormField>

                  <PrimaryButton type="button" onClick={handleNext}>
                    <ArrowLeft size={16} />
                    التالي
                  </PrimaryButton>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <Title>خطوة ٢ من ٣ — بياناتك الشخصية</Title>
                  <Subheading>أدخل اسمك وميلادك والمرحلة الدراسية</Subheading>

                  <FormField label="الاسم الكامل" icon={User} error={fieldErrors.name}>
                    <Input
                      type="text"
                      placeholder="اسمك بالكامل"
                      value={data.name}
                      onChange={(event) => setData((current) => ({ ...current, name: event.target.value }))}
                      $error={Boolean(fieldErrors.name)}
                    />
                  </FormField>

                  <FormField label="البريد الإلكتروني" icon={Mail} error={fieldErrors.email}>
                    <Input type="email" value={data.email} readOnly />
                  </FormField>

                  <BirthdateSelect
                    value={data.birthdate}
                    onChange={(birthdate) => setData((current) => ({ ...current, birthdate }))}
                    error={fieldErrors.birthdate}
                  />

                  <FormField label="المرحلة الدراسية" icon={PenSquare} error={fieldErrors.level}>
                    <Select
                      value={data.level}
                      $error={Boolean(fieldErrors.level)}
                      onChange={(event) => setData((current) => ({ ...current, level: event.target.value }))}
                    >
                      <option value="">اختر المرحلة</option>
                      {levelOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </Select>
                  </FormField>

                  <NavRow>
                    <GhostButton type="button" onClick={handleBack}>
                      <ArrowRight size={16} />
                      رجوع
                    </GhostButton>
                    <PrimaryButton type="button" onClick={handleNext}>
                      <ArrowLeft size={16} />
                      التالي
                    </PrimaryButton>
                  </NavRow>
                </>
              ) : null}

              {step === 3 ? (
                <>
                  <Title>خطوة ٣ من ٣ — مراجعة بياناتك</Title>
                  <Subheading>راجع المعلومات ثم أكمل إنشاء الحساب</Subheading>

                  <Summary>
                    <SummaryRow>
                      <SummaryLabel>👤 الاسم:</SummaryLabel>
                      <SummaryValue>{data.name || '—'}</SummaryValue>
                      <EditButton type="button" onClick={() => goToFieldStep('name')}>
                        تعديل
                      </EditButton>
                    </SummaryRow>
                    <SummaryRow>
                      <SummaryLabel>📧 البريد:</SummaryLabel>
                      <SummaryValue>{data.email || '—'}</SummaryValue>
                      <EditButton type="button" onClick={() => goToFieldStep('email')}>
                        تعديل
                      </EditButton>
                    </SummaryRow>
                    <SummaryRow>
                      <SummaryLabel>🎂 الميلاد:</SummaryLabel>
                      <SummaryValue>{summaryBirthdate}</SummaryValue>
                      <EditButton type="button" onClick={() => goToFieldStep('birthdate')}>
                        تعديل
                      </EditButton>
                    </SummaryRow>
                    <SummaryRow>
                      <SummaryLabel>🏫 المرحلة:</SummaryLabel>
                      <SummaryValue>{summaryLevel}</SummaryValue>
                      <EditButton type="button" onClick={() => goToFieldStep('level')}>
                        تعديل
                      </EditButton>
                    </SummaryRow>
                  </Summary>

                  <div>
                    <CheckboxRow>
                      <input
                        type="checkbox"
                        checked={data.termsAccepted}
                        onChange={(event) => setData((current) => ({ ...current, termsAccepted: event.target.checked }))}
                      />
                      <span>أوافق على شروط الاستخدام</span>
                    </CheckboxRow>
                    {fieldErrors.termsAccepted ? <SmallError>{fieldErrors.termsAccepted}</SmallError> : null}
                  </div>

                  <NavRow>
                    <GhostButton type="button" onClick={handleBack}>
                      <ArrowRight size={16} />
                      رجوع
                    </GhostButton>
                    <PrimaryButton type="submit" disabled={loading}>
                      {loading ? <Spinner size={16} /> : <Check size={16} />}
                      {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب ✝'}
                    </PrimaryButton>
                  </NavRow>
                </>
              ) : null}
            </Section>
          </AnimatePresence>
        </Form>
      </Card>
    </Shell>
  );
}