import { PencilSimple, TrashSimple } from 'phosphor-react';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, ActionBtn } from './styles';

interface Transaction {
  _id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: string;
}

interface Props {
  handleOpenDeleteTransactionModal: (transactionId: string) => void;
  handleOpenEditTransactionModal: (
    transaction: Omit<Transaction, 'createdAt'>
  ) => void;
  transactions: Transaction[];
}

export const TransactionsTable = ({
  handleOpenEditTransactionModal,
  handleOpenDeleteTransactionModal,
  transactions,
}: Props) => {
  // const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
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
                      onClick={() =>
                        handleOpenEditTransactionModal({
                          _id,
                          title,
                          amount,
                          category,
                          type,
                        })
                      }
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
