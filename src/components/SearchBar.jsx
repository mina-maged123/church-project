import styled from 'styled-components';
import { Search } from 'lucide-react';

const Shell = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(245, 240, 232, 0.88);
  border: 1px solid rgba(201, 168, 76, 0.7);
  border-radius: 999px;
  padding: 1rem 1.2rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: box-shadow 180ms ease, transform 180ms ease;

  &:focus-within {
    box-shadow: 0 0 0 4px rgba(201, 168, 76, 0.18), 0 16px 30px rgba(201, 168, 76, 0.12);
    transform: translateY(-1px);
  }
`;

const Field = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--dark-ink);
  font-size: 1rem;

  &::placeholder {
    color: rgba(26, 18, 8, 0.58);
  }
`;

export function SearchBar({ value, onChange, placeholder }) {
  return (
    <Shell>
      <Search size={18} color="var(--gold)" />
      <Field value={value} onChange={onChange} placeholder={placeholder} />
    </Shell>
  );
}
