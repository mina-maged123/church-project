import styled from 'styled-components';

const Row = styled.div`
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
`;

const Dot = styled.span`
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 999px;
  border: 1.5px solid rgba(201, 168, 76, 0.55);
  background: ${({ $state }) => {
    if ($state === 'done') return 'var(--deep-red)';
    if ($state === 'active') return 'var(--gold)';
    return 'transparent';
  }};
  box-shadow: ${({ $state }) => ($state === 'active' ? '0 0 0 6px rgba(201, 168, 76, 0.14)' : 'none')};
`;

export function StepIndicator({ currentStep, steps = 3 }) {
  return (
    <Row aria-label="مؤشر خطوات التسجيل">
      {Array.from({ length: steps }).map((_, index) => {
        const stepNumber = index + 1;
        const state = stepNumber < currentStep ? 'done' : stepNumber === currentStep ? 'active' : 'pending';
        return <Dot key={stepNumber} $state={state} />;
      })}
    </Row>
  );
}