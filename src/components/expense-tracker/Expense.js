import { useDispatch } from 'react-redux';
import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';
import { removeTransaction } from '../../features/transaction/transactionSlice';
const Expense = ({ transaction = {} }) => {
	const dispatch = useDispatch();
	const { id, name, amount, type } = transaction;
	const deleteTransaction = () => {
		dispatch(removeTransaction(id));
	};
	return (
		<li className={`transaction ${type}`}>
			<p>{name}</p>
			<div className="right">
				<p>৳ {amount}</p>
				<button className="link">
					<img
						className="icon"
						src={editIcon}
						alt=""
					/>
				</button>
				<button
					onClick={deleteTransaction}
					className="link"
				>
					<img
						className="icon"
						src={deleteIcon}
						alt=""
					/>
				</button>
			</div>
		</li>
	);
};

export default Expense;
