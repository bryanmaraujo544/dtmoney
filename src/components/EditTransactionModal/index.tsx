import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTransactions } from '../../hooks/useTransactions';
import closeImg from '../../assets/close.svg';

interface Transaction {
  _id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: string;
}
interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  transactionToEdit: Omit<Transaction, 'createdAt'>;
}

interface Inputs {
  title: string;
  category: string;
  amount: number;
}

export const EditTransactionModal = ({
  isOpen,
  onRequestClose,
  transactionToEdit,
}: Props) => {
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { updateTransaction } = useTransactions();

  useEffect(() => {
    setValue('amount', transactionToEdit?.amount);
    setValue('title', transactionToEdit?.title);
    setValue('category', transactionToEdit?.category);
    setType(transactionToEdit?.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionToEdit]);

  const handleEditTransaction: SubmitHandler<Inputs> = async (data) => {
    await updateTransaction({
      ...data,
      amount: Number(data.amount),
      _id: transactionToEdit._id,
      type,
    });
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Close modal" />
      </button>
      <Container onSubmit={handleSubmit(handleEditTransaction)}>
        <h2>Edit transaction</h2>

        <input
          placeholder="Title"
          {...register('title', { required: true })}
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="error">Field required</span>}
        <input
          placeholder="Amount"
          type="number"
          {...register('amount', { required: true })}
          // value={amount}
          // onChange={(e) => setAmount(Number(e.target.value))}
        />
        {errors.amount && <span className="error">Field required</span>}

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Income" />
            <span>Income</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Withdraw" />
            <span>Withdraw</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Category"
          {...register('category', { required: true })}
          // value={category}
          // onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <span className="error">Field required</span>}

        <button type="submit">Update</button>
      </Container>
    </ReactModal>
  );
};
