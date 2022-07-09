import { useState } from 'react';
import { EditTransactionModal } from '../EditTransactionModal';
import { DeleteTransactionModal } from '../DeleteTransactionModal';
import { Summary } from '../Summary';
import { TransactionsTable } from '../TransactionsTable';
import { Container } from './styles';
import { NavHeader } from '../NavHeader';
import { useTransactions } from '../../hooks/useTransactions';
import { DateTime } from 'luxon';

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

  const [search, setSearch] = useState('');
  const [year, setYear] = useState('All');
  const [month, setMonth] = useState('All');

  const { transactions } = useTransactions();

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

  const filteredByDate = transactions?.filter((transaction) => {
    if (month === 'All' && year === 'All') {
      return true;
    }

    const dt = DateTime.fromISO(transaction.createdAt);

    if (year === 'All' && dt.month === Number(month)) {
      return true;
    }

    if (month === 'All' && dt.year === Number(year)) {
      return true;
    }

    if (dt.year === Number(year) && dt.month === Number(month)) {
      return true;
    }
    return false;
  });

  const filteredBySearch = filteredByDate?.filter((transaction) => {
    const str = (transaction.title + transaction.category).toLowerCase();

    if (str.includes(search.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <>
      <Container>
        <Summary />
        <NavHeader
          setMonth={setMonth}
          setYear={setYear}
          setSearch={setSearch}
        />
        <TransactionsTable
          handleOpenEditTransactionModal={handleOpenEditTransactionModal}
          handleOpenDeleteTransactionModal={handleOpenDeleteTransactionModal}
          transactions={filteredBySearch}
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
