import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeTransaction,
	createTransaction,
	editInActive,
} from '../../features/transaction/transactionSlice';
const AddExpense = () => {
	const dispatch = useDispatch();
	const { editTransaction } = useSelector((state) => state.transaction);
	const [values, setValues] = useState({ name: '', type: '', amount: '' });
	const [editMode, setEditMode] = useState(false);
	const { isLoading, isError, error } = useSelector((state) => state.transaction);
	const stateChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const reset = () => {
		setValues({ name: '', type: '', amount: '' });
	};

	const handleCreate = (e) => {
		e.preventDefault();
		dispatch(createTransaction({ ...values, amount: Number(values.amount) }));
		reset();
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(changeTransaction({ id: editTransaction?.id, data: values }));
		setEditMode(false);
		reset();
	};

	const cancelEdit = () => {
		setEditMode(false);
		dispatch(editInActive());
	};

	useEffect(() => {
		const { id, name, type, amount } = editTransaction || {};
		if (id) {
			setEditMode(true);
			setValues({
				name,
				type,
				amount,
			});
		} else {
			setEditMode(false);
			reset();
		}
	}, [editTransaction]);

	return (
		<div className="form">
			<h3>Add new transaction</h3>
			<form onSubmit={editMode ? handleUpdate : handleCreate}>
				<div className="form-group">
					<label>Name</label>
					<input
						type="text"
						name="name"
						required
						value={values.name}
						placeholder="Enter Title"
						onChange={stateChange}
					/>
				</div>

				<div className="form-group radio">
					<label>Type</label>
					<div className="radio_group">
						<input
							type="radio"
							value="income"
							required
							name="type"
							onChange={stateChange}
							checked={values.type === 'income'}
						/>
						<label>Income</label>
					</div>
					<div className="radio_group">
						<input
							type="radio"
							value="expense"
							name="type"
							onChange={stateChange}
							placeholder="Expense"
							checked={values.type === 'expense'}
						/>
						<label>Expense</label>
					</div>
				</div>

				<div className="form-group">
					<label>Amount</label>
					<input
						type="number"
						placeholder="Enter Amount"
						value={values.amount}
						required
						name="amount"
						onChange={stateChange}
					/>
				</div>

				<button
					disabled={isLoading}
					className="btn"
					type="submit"
				>
					{editMode ? 'Edit' : 'Add'} Transaction
				</button>

				{!isLoading && isError && <p className="error">{error}</p>}
			</form>
			{editMode && (
				<button
					onClick={cancelEdit}
					className="btn cancel_edit"
				>
					Cancel Edit
				</button>
			)}
		</div>
	);
};

export default AddExpense;
