import { Container, Form, InputGroup } from './styles';

import logoImg from '../../assets/logo.svg';

export const Register = () => {
  return (
    <Container>
      <Form>
        <header>
          <h1>Sign-Up</h1>
          <img src={logoImg} alt="" />
        </header>

        <div className="names">
          <InputGroup>
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" placeholder="Mayck" />
          </InputGroup>
          <InputGroup>
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" placeholder="James" />
          </InputGroup>
        </div>
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
