import { useEffect } from 'react';
import { api } from '../../services/api';

import { Container } from './styles';

export const TransactionsTable = () => {
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/transactions');
      console.log(data);
    })();
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$ 12.000,00</td>
            <td>Desenvolvimento</td>
            <td>20/02/2022</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$ 1.100,00</td>
            <td>Casa</td>
            <td>17/02/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};
