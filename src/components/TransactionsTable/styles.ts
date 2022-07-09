import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
  overflow-x: scroll;
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }

      &.actions {
        width: 0;
      }

      .action-btns {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
`;

export const ActionBtn = styled.button<{ btnType: 'edit' | 'trash' }>`
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  color: var(--text-body);

  transition: color 0.2s;

  &:hover {
    color: ${({ btnType }) =>
      btnType === 'edit' ? 'var(--blue)' : 'var(--red)'};
  }
`;
