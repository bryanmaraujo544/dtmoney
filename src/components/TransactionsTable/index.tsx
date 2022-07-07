import { PencilSimple, TrashSimple } from 'phosphor-react';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, ActionBtn } from './styles';

interface Props {
  handleOpenDeleteTransactionModal: (transactionId: string) => void;
  handleOpenEditTransactionModal: () => void;
}

export const TransactionsTable = ({
  handleOpenEditTransactionModal,
  handleOpenDeleteTransactionModal,
}: Props) => {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map(
            ({ _id, type, title, amount, category, createdAt }) => (
              <tr key={_id}>
                <td>{title}</td>
                <td className={type}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(amount)}
                </td>
                <td>{category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(new Date(createdAt))}
                </td>
                <td className="actions">
                  <div className="action-btns">
                    <ActionBtn
                      btnType="edit"
                      onClick={() => handleOpenEditTransactionModal()}
                    >
                      <PencilSimple size={20} weight="bold" className="icon" />
                    </ActionBtn>
                    <ActionBtn
                      btnType="trash"
                      onClick={() =>
                        handleOpenDeleteTransactionModal(String(_id))
                      }
                    >
                      <TrashSimple size={20} weight="bold" className="icon" />
                    </ActionBtn>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Container>
  );
};
