import { Container, Form, InputGroup } from './styles';
import logoImg from '../../assets/logo.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../graphql/generated';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [loginUser, { loading }] = useLoginMutation();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });
      const userId = data?.login?._id as string;
      localStorage.setItem('@id', userId);

      setUser({ _id: userId, firstName: data?.login?.firstName as string });

      toast.success('Logged!');

      navigate('/');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <header>
          <h1>Sign-In</h1>
          <img src={logoImg} alt="" />
        </header>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="blabla@gmail.com"
            {...register('email', { required: true })}
          />
          {errors.email && <span>* Field is required</span>}
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="123"
            {...register('password', { required: true })}
          />
          {errors.password && <span>* Field is required</span>}
        </InputGroup>
        <button type="submit" disabled={loading}>
          Register
        </button>
      </Form>
    </Container>
  );
};
