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
    user: { _id, firstName },
  } = useUser();

  console.log({ _id, firstName });

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <div>
          <NewTransactionBtn
            onClick={handleOpenNewTransactionModal}
            type="button"
          >
            Nova Transação
          </NewTransactionBtn>

          <p>Olá, {firstName}</p>
          <button
            className="sign-out-btn"
            type="button"
            onClick={handleOpenSignOutModal}
          >
            <SignOut
              size={26}
              weight="bold"
              // color="var(--shape)"
              className="icon"
            />
          </button>
        </div>
      </Content>
    </Container>
  );
};
