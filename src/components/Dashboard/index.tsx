import { useState } from 'react';
import { EditTransactionModal } from '../EditTransactionModal';
import { DeleteTransactionModal } from '../DeleteTransactionModal';
import { Summary } from '../Summary';
import { TransactionsTable } from '../TransactionsTable';
import { Container } from './styles';

interface Transaction {
  _id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: string;
}

export const Dashboard = () => {
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] =
    useState(false);

  const [transactionIdToDelete, setTransactionIdToDelete] = useState('');
  const [transactionToEdit, setTransactionToEdit] = useState<
    Omit<Transaction, 'createdAt'>
  >({} as Transaction);

  function handleOpenEditTransactionModal(
    transaction: Omit<Transaction, 'createdAt'>
  ) {
    setIsEditTransactionModalOpen(true);
    setTransactionToEdit(transaction);
  }

  function handleCloseEditTransactionModal() {
    setIsEditTransactionModalOpen(false);
  }

  function handleOpenDeleteTransactionModal(transactionId: string) {
    setIsDeleteTransactionModalOpen(true);
    setTransactionIdToDelete(transactionId);
  }

  function handleCloseDeleteTransactionModal() {
    setIsDeleteTransactionModalOpen(false);
  }
  return (
    <>
      <Container>
        <Summary />
        <TransactionsTable
          handleOpenEditTransactionModal={handleOpenEditTransactionModal}
          handleOpenDeleteTransactionModal={handleOpenDeleteTransactionModal}
        />
      </Container>
      <EditTransactionModal
        isOpen={isEditTransactionModalOpen}
        onRequestClose={handleCloseEditTransactionModal}
        transactionToEdit={transactionToEdit}
      />
      <DeleteTransactionModal
        isOpen={isDeleteTransactionModalOpen}
        onRequestClose={handleCloseDeleteTransactionModal}
        transactionId={transactionIdToDelete}
      />
    </>
  );
};
