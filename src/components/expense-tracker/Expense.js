import { useDispatch } from 'react-redux';
import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';
import { editActive, removeTransaction } from '../../features/transaction/transactionSlice';
import { numberWithCommas } from '../../utils/thousandSeparator';
const Expense = ({ transaction = {} }) => {
	const dispatch = useDispatch();
	const { id, name, amount, type } = transaction;
	const deleteTransaction = () => {
		dispatch(removeTransaction(id));
	};
	const handleEdit = () => {
		dispatch(editActive(transaction));
	};
	return (
		<li className={`transaction ${type}`}>
			<p>{name}</p>
			<div className="right">
				<p>৳ {numberWithCommas(amount)}</p>
				<button
					onClick={handleEdit}
					className="link"
				>
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
