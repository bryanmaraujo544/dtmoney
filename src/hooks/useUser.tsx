import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useGetUserByIdQuery } from '../graphql/generated';

interface User {
  _id: string;
  firstName: string;
}

interface UserContextData {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext({} as UserContextData);

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({} as User);
  const _id = localStorage.getItem('@id');

  const { data } = useGetUserByIdQuery({
    variables: {
      userId: _id as string,
    },
  });

  useEffect(() => {
    setUser({ _id: _id as string, firstName: data?.user.firstName as string });
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  return ctx;
};
