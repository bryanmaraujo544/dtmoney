import { Container, Form, InputGroup } from './styles';
import logoImg from '../../assets/logo.svg';

export const Login = () => {
  return (
    <Container>
      <Form>
        <header>
          <h1>Sign-In</h1>
          <img src={logoImg} alt="" />
        </header>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="blabla@gmail.com" />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" placeholder="123" />
        </InputGroup>
        <button type="submit">Register</button>
      </Form>
    </Container>
  );
};
