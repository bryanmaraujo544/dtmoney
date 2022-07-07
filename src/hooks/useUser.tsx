import { createContext, ReactNode, useContext } from 'react';
import { useGetUserByIdQuery } from '../graphql/generated';

interface User {
  _id: string;
  firstName: string;
}

const UserContext = createContext({} as User);

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const _id = localStorage.getItem('@id');

  const { data } = useGetUserByIdQuery({
    variables: {
      userId: _id as string,
    },
  });

  return (
    <UserContext.Provider
      value={{ _id: _id as string, firstName: data?.user.firstName as string }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  return ctx;
};
