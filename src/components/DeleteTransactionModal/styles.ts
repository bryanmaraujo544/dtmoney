import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    color: var(--text-title);
    text-align: center;
  }

  div {
    width: 100%;
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
`;

export const Button = styled.button<{ isPrimary?: boolean }>`
  flex: 1;
  border: 0;
  background: ${({ isPrimary }) =>
    isPrimary ? 'var(--blue)' : 'transparent)'};
  border: ${({ isPrimary }) =>
    isPrimary ? '0' : '2px solid var(--text-title)'};
  height: 3rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ isPrimary }) =>
    isPrimary ? 'var(--shape)' : 'var(--text-title)'};
  border-radius: 0.25rem;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(1);
  }
`;
