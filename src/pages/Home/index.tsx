import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { Header } from '../../components/Header';
import { NewTransactionModal } from '../../components/NewTransactionModal';
import { useGetUsersQuery } from '../../graphql/generated';

export const Home = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('@id');
    if (!id) {
      navigate('/login');
    }
  }, []);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <>
      <Header handleOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
};
