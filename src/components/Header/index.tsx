import logoImg from '../../assets/logo.svg';
import { useUser } from '../../hooks/useUser';
import { Container, Content } from './styles';

interface Props {
  handleOpenNewTransactionModal: () => void;
}

export const Header = ({ handleOpenNewTransactionModal }: Props) => {
  const { _id, firstName } = useUser();

  console.log({ _id, firstName });

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <div>
          <button onClick={handleOpenNewTransactionModal} type="button">
            Nova Transação
          </button>
          <p>Olá, {firstName}</p>
        </div>
      </Content>
    </Container>
  );
};
