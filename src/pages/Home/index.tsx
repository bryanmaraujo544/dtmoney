import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUsersQuery } from '../../graphql/generated';
import { Dashboard } from '../../components/Dashboard';
import { Header } from '../../components/Header';
import { NewTransactionModal } from '../../components/NewTransactionModal';
import { SignOutModal } from '../../components/SignOutModal';

export const Home = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

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

  function handleOpenSignOutModal() {
    setIsSignOutModalOpen(true);
  }

  function handleCloseSignOutModal() {
    setIsSignOutModalOpen(false);
  }

  return (
    <>
      <Header
        handleOpenNewTransactionModal={handleOpenNewTransactionModal}
        handleOpenSignOutModal={handleOpenSignOutModal}
      />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <SignOutModal
        isOpen={isSignOutModalOpen}
        onRequestClose={handleCloseSignOutModal}
      />
    </>
  );
};
