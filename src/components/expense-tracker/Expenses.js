import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../features/transaction/transactionSlice';
import Expense from './Expense';

const Expenses = () => {
	const { isLoading, transactions, isError, error } = useSelector((state) => state.transaction);
	const dispatch = useDispatch();
	let content = null;
	if (isLoading) {
		content = <p className="text-center">Loading...</p>;
	} else if (!isLoading && isError) {
		content = <p className="eror">{error}</p>;
	} else if (!isLoading && !isError && transactions.length === 0) {
		content = <p className="text-center">No Data Found!</p>;
	} else if (!isLoading && !isError && transactions.length > 0) {
		content = (
			<ul>
				{transactions.map((transaction) => (
					<Expense key={transaction.id} transaction={transaction} />
				))}
			</ul>
		);
	}

	useEffect(() => {
		dispatch(fetchTransactions());
	}, [dispatch]);
	return (
		<>
			<p className="second_heading">Your Transactions:</p>

			<div className="conatiner_of_list_of_transactions">{content}</div>
		</>
	);
};

export default Expenses;
