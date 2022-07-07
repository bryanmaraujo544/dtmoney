import { useState } from 'react';
import { EditTransactionModal } from '../EditTransactionModal';
import { DeleteTransactionModal } from '../DeleteTransactionModal';
import { Summary } from '../Summary';
import { TransactionsTable } from '../TransactionsTable';
import { Container } from './styles';

export const Dashboard = () => {
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] =
    useState(false);

  const [transactionIdToDelete, setTransactionIdToDelete] = useState('');

  function handleOpenEditTransactionModal() {
    setIsEditTransactionModalOpen(true);
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
      />
      <DeleteTransactionModal
        isOpen={isDeleteTransactionModalOpen}
        onRequestClose={handleCloseDeleteTransactionModal}
        transactionId={transactionIdToDelete}
      />
    </>
  );
};
