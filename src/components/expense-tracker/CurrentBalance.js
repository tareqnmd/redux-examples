import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../utils/thousandSeparator';

const getBalance = (transactions) => {
	return transactions.reduce(
		(acc, transaction) =>
			transaction.type === 'income' ? (acc += transaction.amount) : (acc -= transaction.amount),
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
				<span>{numberWithCommas(getBalance(transactions))}</span>
			</h3>
		</div>
	);
};

export default CurrentBalance;
