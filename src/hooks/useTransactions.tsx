import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { toast } from 'react-toastify';
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionsByUserIdQuery,
} from '../graphql/generated';
import { useUser } from './useUser';

interface Transaction {
  _id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: string;
}

interface TransactionInput extends Omit<Transaction, '_id' | 'createdAt'> {
  author: string;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const {
    user: { _id },
  } = useUser();

  const { data } = useGetTransactionsByUserIdQuery({
    variables: {
      userId: _id,
    },
  });
  const [createTransaction, { loading: isCreatingTransaction }] =
    useCreateTransactionMutation();
  const [deleteTransaction, { loading: isDeletingTransaction }] =
    useDeleteTransactionMutation();

  useEffect(() => {
    const userTransactions =
      data?.getTransactionsByUserId as unknown as Transaction[];

    // console.log({ userTransactions });

    setTransactions(userTransactions);
  }, [data]);

  async function handleCreateTransaction({
    title,
    amount,
    category,
    type,
    author,
  }: TransactionInput) {
    // const response = await api.post('/transactions', {
    //   ...data,
    //   createdAt: new Date(),
    // });
    // const { transaction } = response.data;
    const { data } = await createTransaction({
      variables: {
        title,
        amount,
        category,
        type,
        author,
      },
    });

    const transaction = data?.createTransaction as unknown as Transaction;
    setTransactions((prev) => [...prev, transaction]);
  }

  async function handleDeleteTransaction(id: string) {
    try {
      const { data } = await deleteTransaction({
        variables: {
          id,
        },
      });

      if (data?.deleteTransaction === false) {
        toast.error('Algo deu errado');
        return;
      }

      setTransactions((prev) => prev.filter(({ _id }) => _id !== id));
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction: handleCreateTransaction,
        deleteTransaction: handleDeleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const ctx = useContext(TransactionsContext);
  return ctx;
};
