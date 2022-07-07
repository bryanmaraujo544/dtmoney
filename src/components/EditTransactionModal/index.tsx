import ReactModal from 'react-modal';
import { Container } from './styles';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const EditTransactionModal = ({ isOpen, onRequestClose }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <h1>edit</h1>
      </Container>
    </ReactModal>
  );
};
