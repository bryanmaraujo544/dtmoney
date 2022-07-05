import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface Props {
  handleOpenNewTransactionModal: () => void;
}

export const Header = ({ handleOpenNewTransactionModal }: Props) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <button onClick={handleOpenNewTransactionModal} type="button">
          Nova Transação
        </button>
      </Content>
    </Container>
  );
};
