import logoImg from '../../assets/logo.svg';
import { useUser } from '../../hooks/useUser';
import { Container, Content, NewTransactionBtn } from './styles';
import { SignOut } from 'phosphor-react';

interface Props {
  handleOpenNewTransactionModal: () => void;
  handleOpenSignOutModal: () => void;
}

export const Header = ({
  handleOpenNewTransactionModal,
  handleOpenSignOutModal,
}: Props) => {
  const {
    user: { firstName },
  } = useUser();

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <div>
          <NewTransactionBtn
            onClick={handleOpenNewTransactionModal}
            type="button"
          >
            New transaction
          </NewTransactionBtn>

          <p>Hello, {firstName}</p>
          <button
            className="sign-out-btn"
            type="button"
            onClick={handleOpenSignOutModal}
          >
            <SignOut size={26} weight="bold" className="icon" />
          </button>
        </div>
      </Content>
    </Container>
  );
};
