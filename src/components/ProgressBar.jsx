import styled from 'styled-components';

const BarShell = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(26, 18, 8, 0.08);
  overflow: hidden;
  border: 1px solid rgba(201, 168, 76, 0.25);
`;

const BarFill = styled.div`
  height: 100%;
  width: ${({ $value }) => `${$value}%`};
  border-radius: inherit;
  background: linear-gradient(90deg, var(--gold), var(--light-gold));
  box-shadow: 0 0 20px rgba(201, 168, 76, 0.35);
  transition: width 280ms ease;
`;

export function ProgressBar({ value = 0, label }) {
  return (
    <div>
      {label ? <span style={{ display: 'block', marginBottom: 8, color: 'var(--dark-ink)', fontWeight: 700 }}>{label}</span> : null}
      <BarShell aria-label={label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={value} role="progressbar">
        <BarFill $value={value} />
      </BarShell>
    </div>
  );
}
