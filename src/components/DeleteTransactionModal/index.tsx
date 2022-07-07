import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { useDeleteTransactionMutation } from '../../graphql/generated';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, Button } from './styles';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  transactionId: string;
}

export const DeleteTransactionModal = ({
  isOpen,
  onRequestClose,
  transactionId,
}: Props) => {
  const { deleteTransaction } = useTransactions();

  async function handleDelete() {
    await deleteTransaction(transactionId);

    toast.success('Transaction deleted!');
    onRequestClose();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <h2>Delete transaction?</h2>
        <div>
          <Button onClick={onRequestClose}>Cancel</Button>
          <Button isPrimary onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Container>
    </ReactModal>
  );
};
