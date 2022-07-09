import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { toast } from 'react-toastify';
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionsByUserIdQuery,
  useUpdateTransactionMutation,
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
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (
    transaction: Omit<Transaction, 'createdAt'>
  ) => Promise<void>;
  isCreatingTransaction: boolean;
  isDeletingTransaction: boolean;
  isUpdatingTransaction: boolean;
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
  const [updateTransaction, { loading: isUpdatingTransaction }] =
    useUpdateTransactionMutation();

  useEffect(() => {
    const userTransactions =
      data?.getTransactionsByUserId as unknown as Transaction[];

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

  async function handleUpdateTransaction(
    transaction: Omit<Transaction, 'createdAt'>
  ) {
    try {
      const { data } = await updateTransaction({
        variables: {
          id: transaction._id,
          amount: Number(transaction.amount),
          category: transaction.category,
          title: transaction.title,
          type: transaction.type,
        },
      });

      setTransactions((prev) =>
        prev.map((oldTransaction) => {
          if (oldTransaction._id === transaction._id) {
            return data?.updateTransaction as Transaction;
          }
          return oldTransaction;
        })
      );

      toast.success('Transaction updated!', { autoClose: 500 });
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        createTransaction: handleCreateTransaction,
        deleteTransaction: handleDeleteTransaction,
        updateTransaction: handleUpdateTransaction,
        isCreatingTransaction,
        isDeletingTransaction,
        isUpdatingTransaction,
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
