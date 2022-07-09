import styled from 'styled-components';

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -9rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    @media (max-width: 768px) {
      padding: 1rem 1.5rem;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;

      @media (max-width: 768px) {
        font-size: 1.75rem;
      }

      @media (max-width: 468px) {
        font-size: 1.5rem;
        margin-top: 0rem;
      }
    }

    &:last-child {
      background: var(--green);
      color: var(--shape);
    }
  }
`;

export const LastBox = styled.div<{ isNegative: boolean }>`
  background: ${({ isNegative }) =>
    isNegative ? 'var(--red) !important' : 'var(--green) !important'};
`;
