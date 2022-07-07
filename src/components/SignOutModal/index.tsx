import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { Container, Button } from './styles';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const SignOutModal = ({ isOpen, onRequestClose }: Props) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  function handleLogout() {
    localStorage.removeItem('@id');
    setUser({ _id: '', firstName: '' });
    navigate('/login');
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <h2>Really want sign out?</h2>
        <div>
          <Button onClick={onRequestClose}>Cancel</Button>
          <Button isPrimary onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </Container>
    </ReactModal>
  );
};
