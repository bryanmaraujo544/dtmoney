import { MagnifyingGlass } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { Container, InputGroup, Selects } from './styles';

const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028];
const months = [
  {
    name: 'January',
    number: '01',
  },
  {
    name: 'February',
    number: '02',
  },
  {
    name: 'March',
    number: '03',
  },
  {
    name: 'April',
    number: '04',
  },
  {
    name: 'May',
    number: '05',
  },
  {
    name: 'June',
    number: '06',
  },
  {
    name: 'July',
    number: '07',
  },
  {
    name: 'August',
    number: '08',
  },
  {
    name: 'September',
    number: '09',
  },
  {
    name: 'October',
    number: '10',
  },
  {
    name: 'November',
    number: '11',
  },
  {
    name: 'December',
    number: '12',
  },
];

interface Props {
  setYear: Dispatch<SetStateAction<string>>;
  setMonth: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const NavHeader = ({ setMonth, setYear, setSearch }: Props) => {
  return (
    <Container>
      <InputGroup>
        <input
          placeholder="Search for something..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlass size={20} className="icon" />
      </InputGroup>
      <Selects>
        <select onChange={(e) => setMonth(e.target.value)}>
          <option>All</option>
          {months.map((month) => (
            <option key={month.name} value={month.number}>
              {month.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setYear(e.target.value)}>
          <option>All</option>
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </Selects>
    </Container>
  );
};
