import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.form`
  padding: 0.25rem;
  background: var(--blue);
  width: 100%;
  max-width: 40rem;
  padding: 1.5rem;
  border-radius: 0.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: var(--shape);
    margin-bottom: 0.5rem;
  }

  .names {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;

    @media (max-width: 478px) {
      grid-template-columns: 1fr;
    }
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 3.5rem;
    background: var(--green);
    color: #fff;
    border: 0;
    border-radius: 0.25rem;
    font-size: 1rem;
    margin-top: 0.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  label {
    color: var(--background);
  }

  input {
    padding: 0 1rem;
    height: 3rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e8ee;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }
`;
