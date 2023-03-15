import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../../features/transaction/transactionSlice';
const AddExpense = () => {
	const [values, setValues] = useState({ name: '', type: 'income', amount: '' });
	const dispatch = useDispatch();
	const { isLoading, isError, error } = useSelector((state) => state.transaction);
	const stateChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const reset = (e) => {
		e.preventDefault();
		e.target.reset();
		setValues({ name: '', type: 'income', amount: '' });
	};

	const handleCreate = (e) => {
		reset(e);
		dispatch(createTransaction({ ...values, amount: Number(values.amount) }));
	};
	return (
		<div className="form">
			<h3>Add new transaction</h3>
			<form onSubmit={handleCreate}>
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
					Add Transaction
				</button>

				{!isLoading && isError && <p className="error">{error}</p>}
			</form>
			<button className="btn cancel_edit">Cancel Edit</button>
		</div>
	);
};

export default AddExpense;
