import styled from 'styled-components';

const Shell = styled.label`
  display: grid;
  gap: 0.45rem;
`;

const LabelRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--dark-ink);
`;

const ErrorText = styled.div`
  font-size: 0.78rem;
  color: #a11f1f;
  min-height: 1rem;
`;

export function FormField({ label, icon, error, children }) {
  const Icon = icon;

  return (
    <Shell>
      <LabelRow>
        {Icon ? <Icon size={16} aria-hidden="true" /> : null}
        <span>{label}</span>
      </LabelRow>
      {children}
      <ErrorText>{error || '\u00a0'}</ErrorText>
    </Shell>
  );
}