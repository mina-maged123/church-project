import styled from 'styled-components';

const Shell = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const Label = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--dark-ink);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Select = styled.select`
  width: 100%;
  border-radius: 14px;
  border: 1px solid ${({ $error }) => ($error ? 'rgba(161, 31, 31, 0.55)' : 'rgba(139, 26, 26, 0.14)')};
  background: rgba(255, 255, 255, 0.82);
  color: var(--dark-ink);
  padding: 0.8rem 0.9rem;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;

  &:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 4px rgba(201, 168, 76, 0.14);
  }
`;

const ErrorText = styled.div`
  font-size: 0.78rem;
  color: #a11f1f;
  min-height: 1rem;
`;

const months = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

const displayNumber = (value) => new Intl.NumberFormat('ar-EG').format(value);

export function BirthdateSelect({ value, onChange, error }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 96 }, (_, index) => String(currentYear - 5 - index));

  return (
    <Shell>
      <Label>🎂 تاريخ الميلاد</Label>
      <Grid>
        <Select value={value.day} $error={Boolean(error)} onChange={(event) => onChange({ ...value, day: event.target.value })}>
          <option value="">اليوم</option>
          {Array.from({ length: 31 }, (_, index) => String(index + 1)).map((day) => (
            <option key={day} value={day}>{displayNumber(day)}</option>
          ))}
        </Select>
        <Select value={value.month} $error={Boolean(error)} onChange={(event) => onChange({ ...value, month: event.target.value })}>
          <option value="">الشهر</option>
          {months.map((month, index) => (
            <option key={month} value={String(index + 1)}>{month}</option>
          ))}
        </Select>
        <Select value={value.year} $error={Boolean(error)} onChange={(event) => onChange({ ...value, year: event.target.value })}>
          <option value="">السنة</option>
          {years.map((year) => (
            <option key={year} value={year}>{displayNumber(year)}</option>
          ))}
        </Select>
      </Grid>
      <ErrorText>{error || '\u00a0'}</ErrorText>
    </Shell>
  );
}