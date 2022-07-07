import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    p {
      color: var(--shape);
      font-weight: 600;
      background: var(--blue);
      border-radius: 0.25rem;
      height: 3rem;
      display: flex;
      align-items: center;
      margin-left: 2rem;
      margin-right: 1rem;
    }

    .sign-out-btn {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

      .icon {
        transition: color 0.2s;
        color: var(--shape);
        &:hover {
          color: ${darken(0.1, '#fff')};
        }

        &:active {
          color: var(--shape);
        }
      }
    }
  }
`;

export const NewTransactionBtn = styled.button`
  font-size: 1rem;
  color: #fff;
  background: var(--blue-light);
  border: 0;
  padding: 0 2rem;
  border-radius: 0.25rem;
  height: 3rem;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(1);
  }
`;
