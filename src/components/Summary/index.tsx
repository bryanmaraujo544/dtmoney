import { Container } from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { formatToCurrency } from '../../utils/formatToCurrency';

export const Summary = () => {
  const { transactions } = useTransactions();

  const summary = transactions?.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        return {
          ...acc,
          deposits: acc.deposits + transaction.amount,
          total: acc.total + transaction.amount,
        };
      } else {
        return {
          ...acc,
          withdraws: acc.withdraws + transaction.amount,
          total: acc.total - transaction.amount,
        };
      }
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  if (!transactions) {
    return <h1>Loading</h1>;
  }

  return (
    <Container>
      <div>
        <header>
          <p>Incomes</p>
          <img src={incomeImg} alt="Incomes" />
        </header>
        <strong>{formatToCurrency(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Outcomes</p>
          <img src={outcomeImg} alt="Outcomes" />
        </header>
        <strong>{formatToCurrency(summary.withdraws)}</strong>
      </div>
      <div>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{formatToCurrency(summary.total)}</strong>
      </div>
    </Container>
  );
};
