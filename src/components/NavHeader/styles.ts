import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  background: yellowgreen;
  flex: 1;
  max-width: 23rem;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    background-color: orange;
  }

  input {
    width: 100%;
    background-color: var(--shape);
    border: 0;
    padding: 0 1rem;
    height: 2.5rem;
    padding-right: calc(1rem + 22px);
  }

  .icon {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--shape);
    padding: 0 0.25rem;
    box-sizing: content-box;
  }
`;

export const Selects = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }

  select {
    height: 2.5rem;
    border: 0;
    padding: 0 1rem;
    width: 10rem;

    @media (max-width: 768px) {
      flex: 1;
    }

    option {
      border: 0;
      padding: 0.5rem;
    }
  }
`;
