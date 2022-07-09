import { useState } from 'react';
import { Container, Form, InputGroup, BottomText } from './styles';

import logoImg from '../../assets/logo.svg';
import { useCreateUserMutation } from '../../graphql/generated';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [registerUser, { loading }] = useCreateUserMutation();
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleRegisterUser: SubmitHandler<Inputs> = async ({
    email,
    firstName,
    lastName,
    password,
  }) => {
    try {
      setIsRegistering(true);
      if (isRegistering) {
        return;
      }
      const data = await registerUser({
        variables: {
          data: {
            firstName,
            email,
            lastName,
            password,
            active: true,
          },
        },
      });
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message, {
        className: 'toast',
        autoClose: 1000,
      });
      setIsRegistering(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleRegisterUser)}>
        <header>
          <h1>Sign-Up</h1>
          <img src={logoImg} alt="" />
        </header>

        <div className="names">
          <InputGroup>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="Mayck"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && <span>* Field required</span>}
          </InputGroup>
          <InputGroup>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              placeholder="James"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && <span>* Field required</span>}
          </InputGroup>
        </div>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="blabla@gmail.com"
            {...register('email', { required: true })}
          />
          {errors.email && <span>* Field required</span>}
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="123"
            {...register('password', { required: true })}
          />
          {errors.password && <span>* Field required</span>}
        </InputGroup>
        <button disabled={isRegistering} type="submit">
          Register
        </button>
      </Form>
      <BottomText>
        Already have an account? <Link to="/login">Sign-In</Link>
      </BottomText>
    </Container>
  );
};
