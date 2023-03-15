import { useSelector } from 'react-redux';

const getBalance = (transactions) => {
	return transactions.reduce(
		(acc, transaction) =>
			acc +
			(transaction.type === 'income'
				? transaction.amount
				: transaction.type === 'expense'
				? -transaction.amount
				: 0),
		0
	);
};

const CurrentBalance = () => {
	const { transactions } = useSelector((state) => state.transaction);
	return (
		<div className="top_card">
			<p>Your Current Balance</p>
			<h3>
				<span>৳</span>
				<span>{getBalance(transactions)}</span>
			</h3>
		</div>
	);
};

export default CurrentBalance;
